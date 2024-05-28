import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'

describe("[e2e] Get Production", () => {
  test('[GET] /productions/productionId', async () => {
    const { token } = await createAndAuthenticate(app)

    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: `Eduardo Rodrigues`
      }
    })

    const production = await prisma.production.create({
      data: {
        activities: '1,2,3',
        litersOfProduct: 3000,
        quantityProduced: 600,
        realizedIn: "2024-05-24T00:00:00.000Z",
        colaboratorId: 1166,
      }
    })

    const response = await request(app)
    .get(`/productions/${production.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.statusCode).toEqual(200)
  })
})