import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'
import { subDays } from 'date-fns'

describe("[e2e] Metrics on last day", () => {
  test('[GET] /metrics/consume-on-last-day', async () => {
    const { token } = await createAndAuthenticate(app)

    const currentDate = new Date()
    const yesterday = subDays(currentDate, 1)
    const month = yesterday.getMonth() + 1
    const year = yesterday.getFullYear()

    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: 'Eduardo Rodrigues'
      }
    })

    await prisma.production.create({
      data: {
        activities: '1,2,7',
        minilitersOfAlcool: 10000,
        quantityProducedOnAlcool: 600,
        realizedIn: yesterday,
        colaboratorId: 1166,
      },
    })

    await prisma.production.create({
      data: {
        activities: '1,2,6',
        minilitersOfDoubleSidedGlue: 4000,
        quantityProducedOnSidedGlue: 600,
        realizedIn: yesterday,
        colaboratorId: 1166,
      },
    })

    const response = await request(app)
    .get('/metrics/consume-on-last-day')
    .set('Authorization', `Bearer ${token}`)
    .send()

    const metricsOnLastDay = response.body.metricsOnLastDay

    expect(response.statusCode).toEqual(200)
    expect(metricsOnLastDay).toEqual(expect.objectContaining({
      sumOfMinilitersOfAlcool: 10000,
      sumOfMinilitersOfDoubleSidedGlue: 4000,
      totalOfPiecesOfAlcool: 600,
      totalOfPiecesOfDoubleSidedGlue: 600,
      month,
      year,
      totalRecordsOfAlcool: 1,
      totalRecordsOfDoubleSidedGlue: 1,
    }))
  })
})