import { Request, Response } from 'express'

import { PrismaMetricsRepository } from '../repositories/prisma/metrics-repository'

export async function getConsumeOnLastTwelveMonth(_request: Request, response: Response) {
  const { consumeOnLastTwelveMonths } = PrismaMetricsRepository()

  const metricsOnLastTwelveMonths = await consumeOnLastTwelveMonths()

  response.status(200).json({
    metricsOnLastTwelveMonths
  })
}