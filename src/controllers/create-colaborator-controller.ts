import { z } from 'zod'
import { Request, Response } from 'express'

import { AppError } from '../utils/errors/AppError'
import { PrismaColaboratorsRepository } from '../repositories/prisma/colaborators-repository'

export async function createColaborator(request: Request, response: Response) {
  const createColaboratorBodySchema = z.object({
    id: z.number().int().positive().min(3),
    name: z.string(),
  })

  const { id, name } = createColaboratorBodySchema.parse(request.body)
  const { create, findById } = PrismaColaboratorsRepository()

  if (!name || !id) {
    return AppError('Please insert registration and name.', 400, response)
  }

  const colaboratorWithSameId = await findById(id)

  if (colaboratorWithSameId) {
    return AppError('Colaborator already exists', 409, response)
  }

  const colaborator = await create({
    id,
    name,
  })

  response.status(201).json({ colaborator })
}