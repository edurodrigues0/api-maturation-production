import { Request, Response } from 'express'

import { PrismaMetricsRepository } from '../repositories/prisma/metrics-repository'

export async function getConsumeOnLastSixMonth(_request: Request, response: Response) {
  const { consumeOnLastSixMonths } = PrismaMetricsRepository()

  const metricsOnLastSixMonths = await consumeOnLastSixMonths()

  response.status(200).json({
    metricsOnLastSixMonths
  })
}