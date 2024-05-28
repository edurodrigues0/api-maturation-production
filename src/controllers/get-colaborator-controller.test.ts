import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'

describe("[e2e] Get Colaborator", () => {
  test('[GET] /colaborators/colaboratorId', async () => {
    const { token } = await createAndAuthenticate(app)

    const colaborator = await prisma.colaborator.create({
      data: {
        id: 1166,
        name: `Eduardo Rodrigues`
      }
    })

    const response = await request(app)
    .get(`/colaborators/${colaborator.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.statusCode).toEqual(200)
  })
})