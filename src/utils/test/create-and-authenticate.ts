import request from 'supertest'

import { hash } from 'bcrypt'
import { prisma } from '../../lib/prisma'
import { Express } from 'express'


export async function createAndAuthenticate(app: Express) {
  const admin = await prisma.admin.create({
    data: {
      name: "Eduardo Rodrigues",
      email: "eduardorodrigues@example.com",
      password: await hash('123456', 4)
    }
  })

  const authResponse = await request(app).post('/admin/sessions').send({
    email: "eduardorodrigues@example.com",
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token
  }
}