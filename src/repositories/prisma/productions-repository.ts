import { Prisma, Production } from '@prisma/client'

import { ProductionRepository } from '../productions'
import { prisma } from '../../lib/prisma'
import { Pagination } from '../../@types/pagination'

interface FetchProduction extends Production {
  colaborator: {
    name: string
  }
}

interface FetchProductionResult {
  productions: FetchProduction[];
  pagination: Pagination;
}

export const PrismaProductionsRepository = (): ProductionRepository => {
  return {
    async create(data: Prisma.ProductionUncheckedCreateInput): Promise<Production> {
      const production = await prisma.production.create({
        data,
      })

      return production
    },

    async findById(id): Promise<Production | null> {
      const production = await prisma.production.findUnique({
        where: {
          id,
        }
      })

      if (!production) {
        return null
      }

      return production
    },

    async findByDate(
      colaboratorId, 
      startOfDay,
      endOfDay
    ): Promise<Production | null> {
      const production = await prisma.production.findFirst({
        where: {
          colaboratorId,
          realizedIn: {
            gte: startOfDay,
            lte: endOfDay,
          },
        }
      })

      if (!production) {
        return null
      }

      return production
    },

    async get(id): Promise<Production | null> {
      const production = await prisma.production.findUnique({
        where: {
          id
        }
      })

      if (!production) {
        return null
      }

      return production
    },

    async fetch(page, filter): Promise<FetchProductionResult> {
      let startOfDay
      let endOfDay
    
      if (filter.realizedIn) {
        startOfDay = new Date(filter.realizedIn)
        startOfDay.setUTCHours(0, 0, 0, 0)
      
        endOfDay = new Date(filter.realizedIn)
        endOfDay.setUTCHours(23, 59, 59, 999)
      } 

      const productions = await prisma.production.findMany({
        include: {
          colaborator: {
            select: {
              name: true,
            }
          }
        },
        where: {
          realizedIn: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        orderBy: {
          realizedIn: 'desc',
        },
        take: 20,
        skip: (page - 1) * 20
      })
    
      const totalItems = await prisma.production.count()
      const totalPages = Math.ceil(totalItems / 10)     
      const itemsPerPage = page === totalPages ? totalItems % 10 : 10
    
      const pagination = {
        currentPage: page,
        totalItems,
        totalPages,
        itemsPerPage
      }

      return {
        productions,
        pagination
      }
    },

    async edit(id: number, data: Prisma.ProductionUpdateInput): Promise<void> {
      await prisma.production.update({
        where: {
          id
        },
        data,
      })
    },
  }
}