import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'
import { subMonths } from 'date-fns'

describe("[e2e] Metrics on last month", () => {
  test('[GET] /metrics/consume-on-last-month', async () => {
    const { token } = await createAndAuthenticate(app)

    const currentDate = new Date()
    const lastMonth = subMonths(currentDate, 1)
    const month = lastMonth.getMonth() + 1
    const year = lastMonth.getFullYear()

    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: 'Eduardo Rodrigues'
      }
    })

    await prisma.production.create({
      data: {
        activities: '1,2,3',
        minilitersOfFinalTrim: 10000,
        quantityProducedOnFinalTrim: 600,
        realizedIn: currentDate,
        colaboratorId: 1166,
      },
    })

    await prisma.production.create({
      data: {
        activities: '1,2,7',
        minilitersOfAlcool: 10000,
        quantityProducedOnAlcool: 600,
        realizedIn: lastMonth,
        colaboratorId: 1166,
      },
    })

    await prisma.production.create({
      data: {
        activities: '1,2,3',
        minilitersOfFinalTrim: 4000,
        quantityProducedOnFinalTrim: 600,
        realizedIn: lastMonth,
        colaboratorId: 1166,
      },
    })

    const response = await request(app)
    .get('/metrics/consume-on-last-month')
    .set('Authorization', `Bearer ${token}`)
    .send()

    const metricsOnLastMonth = response.body.metricsOnLastMonth

    expect(response.statusCode).toEqual(200)
    expect(metricsOnLastMonth).toEqual(expect.objectContaining({
      sumOfMinilitersOfAlcool: 10000,
      sumOfMinilitersOfFinalTrim: 4000,
      totalOfPiecesOfAlcool: 600,
      totalOfPiecesOfFinalTrim: 600,
      month,
      year,
      totalRecordsOfAlcool: 1,
      totalRecordsOfFinalTrim: 1,
    }))
  })
})