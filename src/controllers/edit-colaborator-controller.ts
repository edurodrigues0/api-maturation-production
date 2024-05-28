import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

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

  if (!name && !id && isOnSector === undefined) {
    return AppError('Insert any data.', 400, response)
  }

  const colaborator = await prisma.colaborator.findUnique({
    where: {
      id: colaboratorId
    }
  })

  let colaboratorWithSameId = null

  if (id !== undefined) {
    colaboratorWithSameId = await prisma.colaborator.findUniqueOrThrow({
      where: {
        id: id !== undefined ? id : undefined,
      }
    })
  }

  if (!colaborator) {
    return AppError('Colaborator not exists.', 404, response)
  }

  if (colaboratorWithSameId !== null && colaboratorWithSameId.id !== colaborator.id) {
    return AppError('Colaborator with same id.', 409, response)
  }

  await prisma.colaborator.update({
    where: {
      id: colaboratorId,
    },
    data: {
      id,
      name,
      isOnSector,
    }
  })

  response.status(200).json({
    message: 'Colaborator edited.'
  })
}