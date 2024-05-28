import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function createColaborator(request: Request, response: Response) {
  const createColaboratorBodySchema = z.object({
    id: z.number().int().positive().min(3),
    name: z.string(),
  })

  const { id, name } = createColaboratorBodySchema.parse(request.body)

  if (!name || !id) {
    return AppError('Please insert registration and name.', 400, response)
  }

  const colaboratorWithSameId = await prisma.colaborator.findUnique({
    where: {
      id,
    }
  })

  if (colaboratorWithSameId) {
    return AppError('Colaborator already exists', 409, response)
  }

  const colaborator = await prisma.colaborator.create({
    data: {
      id,
      name,
    }
  })

  response.status(201).json({ colaborator })
}