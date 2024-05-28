import request from 'supertest'
import {
  describe,
  expect,
  test
} from 'vitest'

import { app } from '../app'

describe("Admin routes", () => {
  test('Authenticate admin', async () => {
    await request(app).post('/admin').send({
      name: "Eduardo Rodrigues",
      email: "edurodrigues@example.com",
      password: "123456"
    })

    const response = await request(app).post('/admin/sessions').send({
      email: "edurodrigues@example.com",
      password: "123456"
    })

    expect(response.statusCode).toEqual(201)
  })
})