import { nullable, z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { productionPresenter } from '../presenters/production-presenter'

export async function fetchProductions(request: Request, response: Response) {
  const fetchProductionsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    realizedIn: z.coerce.string().optional()
  })

  const { page, realizedIn } = fetchProductionsQuerySchema.parse(request.query)

  let startOfDay
  let endOfDay

  if (realizedIn) {
    startOfDay = new Date(realizedIn)
    startOfDay.setUTCHours(0, 0, 0, 0)
  
    endOfDay = new Date(realizedIn)
    endOfDay.setUTCHours(23, 59, 59, 999)
  } 

  const productions = await prisma.production.findMany({
    include: {
      colaborator: {
        select: {
          id: true,
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

  const totalPages = Math.ceil(totalItems / 20)
  
  const itemsPerPage = page === totalPages ? totalItems % 20 : 20

  const pagination = {
    currentPage: page,
    totalItems,
    totalPages,
    itemsPerPage,
  }

  response.status(200).json({
    productions: productions.map(productionPresenter),
    pagination
  })
}