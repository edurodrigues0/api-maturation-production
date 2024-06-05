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

describe("[e2e] Metrics on last twerlve months", () => {
  test('[GET] /metrics/consume-on-last-twelve-months', async () => {
    const { token } = await createAndAuthenticate(app)

    const currentDate = new Date()

    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: 'Eduardo Rodrigues'
      }
    })

    for (let i = 0; i < 12; i++) {
      await prisma.production.create({
        data: {
          activities: '1,2,3',
          minilitersOfFinalTrim: 4000,
          quantityProducedOnFinalTrim: 600,
          realizedIn: subMonths(currentDate, i),
          colaboratorId: 1166,
        },
      })
    }

    const response = await request(app)
    .get('/metrics/consume-on-last-twelve-months')
    .set('Authorization', `Bearer ${token}`)
    .send()

    const metricsOnLastTwelveMonths = response.body.metricsOnLastTwelveMonths
    
    expect(response.statusCode).toEqual(200)
    expect(metricsOnLastTwelveMonths).toHaveLength(12)
  })
})