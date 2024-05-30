import { Prisma, Colaborator } from '@prisma/client'
import { Pagination } from '../@types/pagination'

interface FetchFilters {
  colaboratorId?: number
  name?: string
}

export interface ColaboratorRepository {
  create(data: Prisma.ColaboratorCreateInput): Promise<Colaborator>
  findById(id: number): Promise<Colaborator | null>
  edit(id: number, data: Prisma.ColaboratorUpdateInput): Promise<void>
  get(id: number): Promise<Colaborator | null>
  fetch(page: number, filter: FetchFilters): Promise<{
    colaborators: Colaborator[], 
    pagination: Pagination
  }>
}