import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'
import request from 'supertest'
import { AppFactory } from '@expressots/core'
import { prisma } from '../lib/prisma'

describe("Admin routes", () => {
  test('Create admin', async () => {
    const response = await request(app).post('/admin').send({
      name: "Eduardo Rodrigues",
      email: "edurodrigues@example.com",
      password: "123456"
    })

    const adminInDatabase = await prisma.admin.findFirst({
      where: {
        email: "edurodrigues@example.com"
      }
    })

    expect(response.statusCode).toEqual(201)
    expect(adminInDatabase).toBeTruthy()
  })
})