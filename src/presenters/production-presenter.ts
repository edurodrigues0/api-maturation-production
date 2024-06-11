import { Production as PrismaProductionProps } from '@prisma/client'

export interface Production extends PrismaProductionProps {
  colaborator: {
    name: string
  }
}

export function productionPresenter(production: Production) {
  return {
    id: production.id,
    activities: production.activities,
    realizedIn: production.realizedIn,
    colaboratorId: production.colaboratorId,
    colaboratorName: production.colaborator.name,
  }
}