import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { env } from '../env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : []
})