import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'

describe("[e2e] Edit Production", () => {
  test('[PUT] /productions/:productionId', async () => {
    const { token } = await createAndAuthenticate(app)

    await prisma.colaborator.create({
      data: {
        id: 1166,
        name: "Eduardo Rodrigues",
      }
    })

    const production = await prisma.production.create({
      data: {
        activities: '1,2,3',
        litersOfProduct: 9000,
        quantityProduced: 1008,
        realizedIn: '2024-05-23T00:00:00.000Z',
        colaboratorId: 1166
      }
    })

    const response = await request(app)
    .put(`/productions/${production.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      activities: ['1', '3', '5', '7'],
      quantityProduced: 600
    })

    const productionEditedInDatabase = await prisma.production.findFirst({
      where: {
        quantityProduced: 600,
      }
    })

    expect(response.statusCode).toEqual(200)
    expect(productionEditedInDatabase).toBeTruthy()
  })
})