import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function removeProduction(request: Request, response: Response) {
  const removeProductionParamsSchema = z.object({
    productionId: z.coerce.number().int().positive().min(3),
  })

  const { productionId } = removeProductionParamsSchema.parse(request.params)

  const production = await prisma.production.findUnique({
    where: {
      id: productionId,
    }
  })

  if (!production) {
    return AppError('Production not exists', 404, response)
  }

  await prisma.production.delete({
    where: {
      id: productionId,
    },
  })

  response.status(200).json({
    message: 'Production deleted',
  })
}