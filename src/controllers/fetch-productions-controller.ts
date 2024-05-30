import { nullable, z } from 'zod'
import { Request, Response } from 'express'

import { productionPresenter } from '../presenters/production-presenter'
import { PrismaProductionsRepository } from '../repositories/prisma/productions-repository'

export async function fetchProductions(request: Request, response: Response) {
  const fetchProductionsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    realizedIn: z.coerce.string().optional()
  })

  const { page, realizedIn } = fetchProductionsQuerySchema.parse(request.query)
  const { fetch } = PrismaProductionsRepository()

  const { productions, pagination } = await fetch(page, { realizedIn })

  response.status(200).json({
    productions: productions.map(productionPresenter),
    pagination
  })
}