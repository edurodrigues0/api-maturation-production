import { z } from 'zod'
import { Request, Response } from 'express'

import { AppError } from '../utils/errors/AppError'
import { PrismaColaboratorsRepository } from '../repositories/prisma/colaborators-repository'

export async function getColaborator(request: Request, response: Response) {
  const getColaboratorParamsSchema = z.object({
    colaboratorId: z.coerce.number().int().positive().min(3),
  })

  const { colaboratorId } = getColaboratorParamsSchema.parse(request.params)
  const { get } = PrismaColaboratorsRepository()

  const colaborator = await get(colaboratorId)

  if (!colaborator) {
    return AppError('Colaborator not exists.', 404, response)
  }

  response.status(200).json({
    colaborator,
  })
}