import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function editProduction(request: Request, response: Response) {
  const editProductionParamsSchema = z.object({
    productionId: z.coerce.number().int().positive(),
  })
  
  const editProductionBodySchema = z.object({
    activitiesArray: z.array(z.string()).optional(),
    litersOfProduct: z.number().positive().min(0.5).max(60).optional(),
    quantityProduced: z.number().int().positive().optional(),
    realizedIn: z.preprocess((arg) => new Date(arg as string), z.date()).optional()
  })

  const { productionId } = editProductionParamsSchema.parse(request.params)
  const { activitiesArray, litersOfProduct, quantityProduced, realizedIn } = editProductionBodySchema.parse(request.body)

  const production = await prisma.production.findUnique({
    where: {
      id: productionId,
    }
  })

  if (!production) {
    return AppError('Production not exists', 404, response)
  }

  await prisma.production.update({
    where: {
      id: productionId,
    },
    data: {
      activities: activitiesArray?.join(','),
      litersOfProduct,
      quantityProduced,
      realizedIn
    }
  })

  response.status(200).json({
    message: 'Production edited'
  })
}