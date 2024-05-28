import { z } from 'zod'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'
import console from 'console'

export async function createProduction(request: Request, response: Response) {
  const createProductionBodySchema = z.object({
    colaboratorId: z.number().int().positive().min(3),
    activitiesArray: z.array(z.string()),
    litersOfProduct: z.number().positive().min(0.5).max(60),
    quantityProduced: z.number().int().positive(),
    realizedIn: z.preprocess((arg) => new Date(arg as string), z.date())
  })

  const { 
    colaboratorId,
    activitiesArray,
    litersOfProduct,
    quantityProduced,
    realizedIn,
  } = createProductionBodySchema.parse(request.body)

  const activities = activitiesArray.join(',')
  const quantityInMilliliter = litersOfProduct * 1000 // 1 Liter x 1.000 = 1.000ml

  const currentDate = new Date()

  const startOfDay = new Date(realizedIn)
  startOfDay.setUTCHours(0, 0, 0, 0)

  const endOfDay = new Date(realizedIn)
  endOfDay.setUTCHours(23, 59, 59, 999)

  const colaborator = await prisma.colaborator.findUnique({
    where: {
      id: colaboratorId,
    }
  })

  if (!colaborator) {
    return AppError('Colaborator not exists.', 404, response)
  }

  if (realizedIn > currentDate) {
    return AppError('Date not allowed.', 405, response)
  }

  const productionOnDayHasBeenRegistred = await prisma.production.findFirst({
    where: {
      colaboratorId,
      realizedIn: {
        gte: startOfDay,
        lte: endOfDay,
      },
    }
  })
  
  if (productionOnDayHasBeenRegistred) {
    return AppError('Production of the day has already exists.', 409, response)
  }

  const production = await prisma.production.create({
    data: {
      colaboratorId,
      activities,
      litersOfProduct: quantityInMilliliter,
      quantityProduced,
      realizedIn,
    }
  })

  console.log(production)

  response.status(201).json({ production })
}