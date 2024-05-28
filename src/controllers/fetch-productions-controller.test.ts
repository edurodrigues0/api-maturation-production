import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'

describe("[e2e] Fetch Productions", () => {
  test('[GET] /productions/', async () => {
    const { token } = await createAndAuthenticate(app)

    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: 'Eduardo Rodrigues'
      }
    })

    await prisma.production.create({
      data: {
        activities: '1,2,3',
        litersOfProduct: 1000,
        quantityProduced: 600,
        realizedIn: "2024-05-23T00:00:00.000Z",
        colaboratorId: 1166,
      },
    })

    await prisma.production.create({
      data: {
        activities: '1,2,3',
        litersOfProduct: 1000,
        quantityProduced: 600,
        realizedIn: "2024-05-24T00:00:00.000Z",
        colaboratorId: 1166,
      },
    })

    const response = await request(app)
    .get(`/productions`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    const productions = response.body.productions

    expect(response.statusCode).toEqual(200)
    expect(productions).toHaveLength(2)
  })
})