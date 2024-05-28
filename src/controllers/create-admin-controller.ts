import { z } from 'zod'
import { hash } from 'bcrypt'
import { Request, Response } from 'express'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'

export async function createAdmin(request: Request, response: Response) {
  const createAdminBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = createAdminBodySchema.parse(request.body)

  if (!name || !email || !password) {
    return AppError('Please insert name, email and password.', 400, response)
  }

  const userWithSameEmail = await prisma.admin.findFirst({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return AppError("E-mail already in use.", 409, response)
  }

  const passwordHash = await hash(password, 4)

  const user = await prisma.admin.create({
    data: {
      name,
      email,
      password: passwordHash,
    }
  })

  response.status(201).json({ ...user, password: undefined })
}