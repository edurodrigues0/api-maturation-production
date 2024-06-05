import { z } from 'zod'
import { Request, Response } from 'express'

import { AppError } from '../utils/errors/AppError'
import { PrismaColaboratorsRepository } from '../repositories/prisma/colaborators-repository'
import { PrismaProductionsRepository } from '../repositories/prisma/productions-repository'

export async function createProduction(request: Request, response: Response) {
  const createProductionBodySchema = z.object({
    minilitersOfFinalTrim: z.number().int().max(60000).default(0),      
    minilitersOfDoubleSidedGlue: z.number().int().max(60000).default(0),
    minilitersOfAlcool: z.number().int().max(60000).default(0),
    quantityProducedOnAlcool: z.number().int().default(0),
    quantityProducedOnSidedGlue: z.number().int().default(0),
    quantityProducedOnFinalTrim: z.number().int().default(0),
    realizedIn: z.preprocess((arg) => new Date(arg as string), z.date()),
    activitiesArray: z.array(z.string()),
    colaboratorId: z.number().int().positive().min(3),
  })

  const { 
    colaboratorId,
    activitiesArray,
    minilitersOfAlcool,
    minilitersOfDoubleSidedGlue,
    minilitersOfFinalTrim,
    quantityProducedOnAlcool,
    quantityProducedOnFinalTrim,
    quantityProducedOnSidedGlue,
    realizedIn,
  } = createProductionBodySchema.parse(request.body)
  const { findById } = PrismaColaboratorsRepository()
  const { create, findByDate } = PrismaProductionsRepository()

  const activities = activitiesArray.join(',')
  const currentDate = new Date()

  const startOfDay = new Date(realizedIn)
  startOfDay.setUTCHours(0, 0, 0, 0)

  const endOfDay = new Date(realizedIn)
  endOfDay.setUTCHours(23, 59, 59, 999)

  const colaborator = await findById(colaboratorId)

  if (!colaborator) {
    return AppError('Colaborator not exists.', 404, response)
  }

  if (realizedIn > currentDate) {
    return AppError('Date not allowed.', 405, response)
  }

  const productionOnDayHasBeenRegistred = await findByDate(colaborator.id, startOfDay, endOfDay)
  
  if (productionOnDayHasBeenRegistred) {
    return AppError('Production of the day has already exists.', 409, response)
  }

  const production = await create({
    colaboratorId,
    activities,
    minilitersOfAlcool,
    minilitersOfDoubleSidedGlue,
    minilitersOfFinalTrim,
    quantityProducedOnAlcool,
    quantityProducedOnFinalTrim,
    quantityProducedOnSidedGlue,
    realizedIn,
  })

  response.status(201).json({ production })
}