import { z } from 'zod'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors/AppError'
import { auth } from '../configs/auth'

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  if (!email || !password) {
    return AppError('Please insert email or password', 400, response)
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    }
  })

  
  if (!admin) {
    return AppError('Invalid credentials.', 404, response)
  }
  
  const passwordIsMatch = await compare(password, admin.password)

  if (!passwordIsMatch) {
    return AppError('Invalid credentials.', 404, response)
  }
  
  const { expiresIn, secret } = auth.jwt

  const token = sign({}, secret, {
    subject: String(admin.id),
    expiresIn
  })

  response.status(201).json({
    admin: {...admin, password: undefined},
    token
  })
}