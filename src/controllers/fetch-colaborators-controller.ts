import { z } from 'zod'
import { Request, Response } from 'express'

import { PrismaColaboratorsRepository } from '../repositories/prisma/colaborators-repository'

export async function fetchColaborators(request: Request, response: Response) {
  const fetchColaboratorsParamsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
  })

  const fetchColaboratorsQuerySchema = z.object({
    colaboratorId: z.coerce.number().int().positive().optional(),
    name: z.string().optional(),
  })

  const { page } = fetchColaboratorsParamsSchema.parse(request.params)
  const { colaboratorId, name } = fetchColaboratorsQuerySchema.parse(request.query)
  const { fetch } = PrismaColaboratorsRepository()

  const {colaborators, pagination } = await fetch(page, { colaboratorId, name })

  response.status(200).json({
    colaborators,
    pagination
  })
}