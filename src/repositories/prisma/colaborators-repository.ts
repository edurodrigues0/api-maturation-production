import { Prisma, Colaborator } from '@prisma/client'
import { ColaboratorRepository } from '../colaborators'
import { prisma } from '../../lib/prisma'
import { Pagination } from '../../@types/pagination'

export const PrismaColaboratorsRepository = (): ColaboratorRepository => {
  return {
    async create(data: Prisma.ColaboratorCreateInput): Promise<Colaborator> {
      const colaborator = await prisma.colaborator.create({
        data,
      })

      return colaborator
    },

    async findById(id): Promise<Colaborator | null> {
      const colaborator = await prisma.colaborator.findUnique({
        where: {
          id,
        }
      })

      if (!colaborator) {
        return null
      }

      return colaborator
    },

    async get(id): Promise<Colaborator | null> {
      const colaborator = await prisma.colaborator.findUnique({
        where: {
          id
        }
      })

      if (!colaborator) {
        return null
      }

      return colaborator
    },

    async fetch(page, filter): Promise<{ colaborators: Colaborator[], pagination: Pagination }> {
      const colaborators = await prisma.colaborator.findMany({
        where: {
          isOnSector: true,
          id: filter.colaboratorId,
          name: {
            contains: filter.name,
          },
        },
        orderBy: {
          name: 'asc',
        },
        take: 10,
        skip: (page - 1) * 10
      })
    
      const totalItems = await prisma.colaborator.count()
      const totalPages = Math.ceil(totalItems / 10)     
      const itemsPerPage = page === totalPages ? totalItems % 10 : 10
    
      const pagination = {
        currentPage: page,
        totalItems,
        totalPages,
        itemsPerPage
      }

      return {
        colaborators,
        pagination
      }
    },

    async edit(id: number, data: Prisma.ColaboratorUpdateInput): Promise<void> {
      await prisma.colaborator.update({
        where: {
          id
        },
        data,
      })
    },
  }
}