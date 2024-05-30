import { Admin, Prisma } from "@prisma/client";

export interface AdminRepository {
  create(data: Prisma.AdminCreateInput): Promise<Admin>
  findByEmail(email: string): Promise<Admin | null>
}