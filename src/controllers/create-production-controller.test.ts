import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'

describe("[e2e] Create Production", () => {
  test('[POST] /productions', async () => {
    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: "Eduardo Rodrigues",
      }
    })

    const response = await request(app).post('/productions').send({
      colaboratorId: 1166,
      activitiesArray: ['1', '2'],
      litersOfProduct: 10,
      quantityProduced: 1008,
      realizedIn: "2024-05-23T00:00:00.000Z"
    })

    const productionOnDatabase = await prisma.production.findFirst({
      where: {
        colaboratorId: 1166,
        quantityProduced: 1008,
      }
    })

    expect(response.statusCode).toEqual(201)
    expect(productionOnDatabase).toBeTruthy()
  })
})