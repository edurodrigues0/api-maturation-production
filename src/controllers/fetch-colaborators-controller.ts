import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function fetchColaborators(request: Request, response: Response) {
  const fetchColaboratorsParamsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
  })

  const fetchColaboratorsQuerySchema = z.object({
    colaboratorId: z.coerce.number().int().positive().optional(),
    name: z.string().optional(),
  })

  const { page } = fetchColaboratorsParamsSchema.parse(request.params)
  const { colaboratorId, name } = fetchColaboratorsQuerySchema.parse(request.query)

  const colaborators = await prisma.colaborator.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    where: {
      isOnSector: true,
      id: colaboratorId,
      name: {
        contains: name,
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

  response.status(200).json({
    colaborators,
    pagination
  })
}