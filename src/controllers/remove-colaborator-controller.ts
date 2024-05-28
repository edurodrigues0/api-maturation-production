import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function removeColaborator(request: Request, response: Response) {
  const removeColaboratorParamsSchema = z.object({
    colaboratorId: z.coerce.number().int().positive().min(3),
  })

  const { colaboratorId } = removeColaboratorParamsSchema.parse(request.params)

  const user = await prisma.colaborator.findUnique({
    where: {
      id: colaboratorId,
    }
  })

  if (!user) {
    return AppError('User not exists', 404, response)
  }

  await prisma.colaborator.delete({
    where: {
      id: colaboratorId,
    },
  })

  response.status(200).json({
    message: 'Colaborator deleted',
  })
}