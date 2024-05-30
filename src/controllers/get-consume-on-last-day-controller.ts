import { Request, Response } from 'express'

import { PrismaMetricsRepository } from '../repositories/prisma/metrics-repository'

export async function getConsumeOnLastDay(_request: Request, response: Response) {
  const { consumeOnLastDay } = PrismaMetricsRepository()

  const metricsOnLastDay = await consumeOnLastDay()

  response.status(200).json({
    metricsOnLastDay
  })
}