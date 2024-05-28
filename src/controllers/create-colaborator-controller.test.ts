import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { AppFactory } from '@expressots/core'
import { prisma } from '../lib/prisma'
import { createAndAuthenticate } from '../utils/test/create-and-authenticate'

describe("[e2e] Create Colaborator", () => {
  test('[POST] /colaborators', async () => {
    const { token } = await createAndAuthenticate(app)

    const response = await request(app)
    .post('/colaborators')
    .set('Authorization', `Bearer ${token}`)
    .send({
      id: 1166,
      name: 'Eduardo Rodrigues'
    })

    const colaboratorInDatabase = await prisma.colaborator.findFirst({
      where: {
        id: 1166,
      }
    })

    expect(response.statusCode).toEqual(201)
    expect(colaboratorInDatabase).toBeTruthy()
  })
})