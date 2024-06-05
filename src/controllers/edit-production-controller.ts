import { z } from 'zod'
import { Request, Response } from 'express'

import { AppError } from '../utils/errors/AppError'
import { PrismaProductionsRepository } from '../repositories/prisma/productions-repository'

export async function editProduction(request: Request, response: Response) {
  const editProductionParamsSchema = z.object({
    productionId: z.coerce.number().int().positive(),
  })
  
  const editProductionBodySchema = z.object({
    activitiesArray: z.array(z.string()).optional(),
    minilitersOfFinalTrim: z.number().int().max(60000).default(0),      
    minilitersOfDoubleSidedGlue: z.number().int().max(60000).default(0),
    minilitersOfAlcool: z.number().int().max(60000).default(0),
    quantityProducedOnAlcool: z.number().int().default(0),
    quantityProducedOnSidedGlue: z.number().int().default(0),
    quantityProducedOnFinalTrim: z.number().int().default(0),
    realizedIn: z.preprocess((arg) => new Date(arg as string), z.date()).optional()
  })

  const { productionId } = editProductionParamsSchema.parse(request.params)
  const { 
    activitiesArray,
    minilitersOfAlcool,
    minilitersOfDoubleSidedGlue,
    minilitersOfFinalTrim,
    quantityProducedOnAlcool,
    quantityProducedOnFinalTrim,
    quantityProducedOnSidedGlue,
    realizedIn,
  } = editProductionBodySchema.parse(request.body)
  const { edit, findById } = PrismaProductionsRepository()

  const production = await findById(productionId)

  if (!production) {
    return AppError('Production not exists', 404, response)
  }

  await edit(productionId, {
    activities: activitiesArray?.join(','),
    minilitersOfAlcool,
    minilitersOfDoubleSidedGlue,
    minilitersOfFinalTrim,
    quantityProducedOnAlcool,
    quantityProducedOnFinalTrim,
    quantityProducedOnSidedGlue,
    realizedIn
  })

  response.status(200).json({
    message: 'Production edited'
  })
}