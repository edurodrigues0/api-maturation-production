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

describe("[e2e] Edit Colaborator", () => {
  test('[PUT] /colaborators/:colaboratorId', async () => {
    const { token } = await createAndAuthenticate(app)

    const colaborator = await prisma.colaborator.create({
      data: {
        id: 1166,
        name: 'Eduardo Rodrigues',
        isOnSector: false,
      }
    })

    const response = await request(app)
    .put(`/colaborators/${colaborator.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Eduardo Henrique de Souza Rodrigues',
      isOnSector: true
    })
    
    const colaboratorEditedInDatabase = await prisma.colaborator.findFirst({
      where: {
        name: 'Eduardo Henrique de Souza Rodrigues',
        isOnSector: true,
      }
    })

    expect(response.statusCode).toEqual(200)
    expect(colaboratorEditedInDatabase).toBeTruthy()
  })
})