import { Prisma, Production, Colaborator } from '@prisma/client'
import { Pagination } from '../@types/pagination'

interface FetchFilters {
  realizedIn: string | undefined
}

interface FetchProduction extends Production {
  colaborator: {
    name: string
  }
}

interface FetchProductionResult {
  productions: FetchProduction[]
  pagination: Pagination
}

export interface ProductionRepository {
  create(data: Prisma.ProductionUncheckedCreateInput): Promise<Production>
  findById(id: number): Promise<Production | null>
  findByDate(
    colaboratorId: number, 
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<Production | null>
  edit(id: number, data: Prisma.ProductionUpdateInput): Promise<void>
  get(id: number): Promise<Production | null>
  fetch(page: number, filter: FetchFilters): Promise<FetchProductionResult>
}