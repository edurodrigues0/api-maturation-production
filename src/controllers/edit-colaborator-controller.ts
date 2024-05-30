import { z } from 'zod'
import { Request, Response } from 'express'

import { AppError } from '../utils/errors/AppError'
import { PrismaColaboratorsRepository } from '../repositories/prisma/colaborators-repository'

export async function editColaborator(request: Request, response: Response) {
  const editColaboratorParamsSchema = z.object({
    colaboratorId: z.coerce.number().int().positive().min(3),
  })
  
  const editColaboratorBodySchema = z.object({
    id: z.number().int().positive().min(3).optional(),
    name: z.string().optional(),
    isOnSector: z.boolean().optional()
  })

  const { colaboratorId } = editColaboratorParamsSchema.parse(request.params)
  const { id, name, isOnSector } = editColaboratorBodySchema.parse(request.body)
  const { findById, edit } = PrismaColaboratorsRepository()

  if (!name && !id && isOnSector === undefined) {
    return AppError('Insert any data.', 400, response)
  }

  const colaborator = await findById(colaboratorId)

  let colaboratorWithSameId = null

  if (id !== undefined) {
    colaboratorWithSameId = await findById(id)
  }

  if (!colaborator) {
    return AppError('Colaborator not exists.', 404, response)
  }

  if (colaboratorWithSameId !== null && colaboratorWithSameId.id !== colaborator.id) {
    return AppError('Colaborator with same id.', 409, response)
  }

  await edit(colaboratorId, { id, name, isOnSector })

  response.status(200).json({
    message: 'Colaborator edited.'
  })
}