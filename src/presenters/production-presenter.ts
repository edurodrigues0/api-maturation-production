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
    minilitersOfAlcool: production.minilitersOfAlcool,
    minilitersOfDoubleSidedGlue: production.minilitersOfDoubleSidedGlue,
    minilitersOfFinalTrim: production.minilitersOfFinalTrim,
    quantityProducedOnAlcool: production.quantityProducedOnAlcool,
    quantityProducedOfDoubleSidedGlue: production.quantityProducedOnSidedGlue,
    quantityProducedOnFinalTrim: production.quantityProducedOnFinalTrim,
    realizedIn: production.realizedIn,
    createdAt: production.createdAt,
    colaboratorId: production.colaboratorId,
    colaboratorName: production.colaborator.name,
  }
}