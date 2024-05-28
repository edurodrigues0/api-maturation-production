import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function getProduction(request: Request, response: Response) {
  const getProductionParamsSchema = z.object({
    productionId: z.coerce.number().int().positive(),
  })

  const { productionId } = getProductionParamsSchema.parse(request.params)

  const production = await prisma.production.findUnique({
    where: {
      id: productionId,
    }
  })

  if (!production) {
    return AppError('Production not exists.', 404, response)
  }

  response.status(200).json({
    production,
  })
}