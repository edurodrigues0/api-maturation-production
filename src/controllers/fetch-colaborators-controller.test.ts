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

describe("[e2e] Fetch Colaborator", () => {
  test('[GET] /colaborators/', async () => {
    const { token } = await createAndAuthenticate(app)

    for (let i = 0; i < 12; i++) {
      await prisma.colaborator.create({
        data: {
          id: 1166+i,
          name: `Colaborator ${i}`
        }
      })
    }

    const response = await request(app)
    .get(`/colaborators?page=2`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    const colaborators = response.body.colaborators

    expect(response.statusCode).toEqual(200)
    expect(colaborators).toHaveLength(2)
  })
})