import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function getColaborator(request: Request, response: Response) {
  const getColaboratorParamsSchema = z.object({
    colaboratorId: z.coerce.number().int().positive().min(3),
  })

  const { colaboratorId } = getColaboratorParamsSchema.parse(request.params)

  const user = await prisma.colaborator.findUnique({
    where: {
      id: colaboratorId,
    }
  })

  if (!user) {
    return AppError('Colaborator not exists.', 404, response)
  }

  const colaborator = await prisma.colaborator.findUnique({
    where: {
      id: colaboratorId,
    },
  })

  response.status(200).json({
    colaborator,
  })
}