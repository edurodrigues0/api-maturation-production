import { Request, Response } from 'express'

import { PrismaMetricsRepository } from '../repositories/prisma/metrics-repository'

export async function getConsumeOnLastMonth(_request: Request, response: Response) {
  const { consumeOnLastMonth } = PrismaMetricsRepository()

  const metricsOnLastMonth = await consumeOnLastMonth()

  response.status(200).json({
    metricsOnLastMonth
  })
}