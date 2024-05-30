import { Prisma, Admin } from '@prisma/client'
import { AdminRepository } from '../admin'
import { prisma } from '../../lib/prisma'

export const PrismaAdminRepository = (): AdminRepository => {
  return {
    async create(data: Prisma.AdminCreateInput): Promise<Admin> {
      const admin = await prisma.admin.create({
        data,
      })

      return admin
    },

    async findByEmail(email): Promise<Admin | null> {
      const admin = await prisma.admin.findUnique({
        where: {
          email,
        }
      })

      if (!admin) {
        return null
      }

      return admin
    },
  }
}