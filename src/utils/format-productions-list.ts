import { Production } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { isSameMonth } from 'date-fns'

type MetricOnMonthsProps = {
  activies: string
  sumOfMinilitersOfAlcool: number
  sumOfMinilitersOfFinalTrim: number
  sumOfMinilitersOfDoubleSidedGlue: number
  totalOfPiecesOfAlcool: number
  totalOfPiecesOfFinalTrim: number
  totalOfPiecesOfDoubleSidedGlue: number
  date: Date
}

const isAlcoolActive = (activies: string) => {
  return activies.includes('7')
}

const isDoubleSidedGlueActive = (activies: string) => {
  return activies.includes('6')
}

const isFinalTrimActive = (activies: string) => {
  return activies.includes('3')
}

function formatReturnOnProductions(production: MetricOnMonthsProps) {
  return {
    id: randomUUID(),
    sumOfMinilitersOfAlcool: production.sumOfMinilitersOfAlcool,
    sumOfMinilitersOfFinalTrim: production.sumOfMinilitersOfFinalTrim,
    sumOfMinilitersOfDoubleSidedGlue: production.sumOfMinilitersOfDoubleSidedGlue,
    totalOfPiecesOfAlcool: production.totalOfPiecesOfAlcool,
    totalOfPiecesOfFinalTrim: production.totalOfPiecesOfFinalTrim,
    totalOfPiecesOfDoubleSidedGlue: production.totalOfPiecesOfDoubleSidedGlue,
    month: production.date.getMonth() + 1,
    year: production.date.getFullYear(),
  }
}

export function formatProductions(productions: Production[]) {
  const metricsOnMonths: MetricOnMonthsProps[] = [];

  for (let i = 0; i < productions.length; i++) {
    let found = false;

    for (let j = 0; j < metricsOnMonths.length; j++) {
      if (isSameMonth(metricsOnMonths[j].date, productions[i].realizedIn)) {
        if (isAlcoolActive(productions[i].activities)) { 
          metricsOnMonths[j].sumOfMinilitersOfAlcool += productions[i].minilitersOfAlcool
          metricsOnMonths[j].totalOfPiecesOfAlcool += productions[i].quantityProducedOnAlcool
        }

        if (isDoubleSidedGlueActive(productions[i].activities)) {
          metricsOnMonths[j].sumOfMinilitersOfDoubleSidedGlue += productions[i].minilitersOfDoubleSidedGlue
          metricsOnMonths[j].totalOfPiecesOfDoubleSidedGlue += productions[i].quantityProducedOnSidedGlue
        }

        if (isFinalTrimActive(productions[i].activities)) {        
          metricsOnMonths[j].sumOfMinilitersOfFinalTrim += productions[i].minilitersOfFinalTrim
          metricsOnMonths[j].totalOfPiecesOfFinalTrim += productions[i].quantityProducedOnFinalTrim
        }

        found = true;
      }
    }

    if (!found) {
      const newMetric: MetricOnMonthsProps = {
        activies: productions[i].activities,
        sumOfMinilitersOfAlcool: isAlcoolActive(productions[i].activities) ? productions[i].minilitersOfAlcool : 0,
        sumOfMinilitersOfDoubleSidedGlue: isDoubleSidedGlueActive(productions[i].activities) ? productions[i].minilitersOfDoubleSidedGlue : 0,
        sumOfMinilitersOfFinalTrim: isFinalTrimActive(productions[i].activities) ? productions[i].minilitersOfFinalTrim : 0,
        totalOfPiecesOfAlcool: isAlcoolActive(productions[i].activities) ? productions[i].quantityProducedOnAlcool : 0,
        totalOfPiecesOfDoubleSidedGlue: isDoubleSidedGlueActive(productions[i].activities) ? productions[i].quantityProducedOnSidedGlue : 0,
        totalOfPiecesOfFinalTrim: isFinalTrimActive(productions[i].activities) ? productions[i].quantityProducedOnFinalTrim : 0,
        date: productions[i].realizedIn,
      }

      metricsOnMonths.push(newMetric)
    }
  }
  
  return metricsOnMonths.map((result) => {
    return formatReturnOnProductions(result)
  })
}