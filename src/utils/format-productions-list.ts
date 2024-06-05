import { Production } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { isSameMonth } from 'date-fns'

interface MetricOnMonthsProps {
  activies: string
  sumOfMinilitersOfAlcool: number
  sumOfMinilitersOfFinalTrim: number
  sumOfMinilitersOfDoubleSidedGlue: number
  totalOfPiecesOfAlcool: number
  totalOfPiecesOfFinalTrim: number
  totalOfPiecesOfDoubleSidedGlue: number
  date: Date
  totalRecordsOfAlcool: number
  totalRecordsOfFinalTrim: number
  totalRecordsOfDoubleSidedGlue: number
}

const isAlcoolActive = (activies: string) => {
  if (activies.includes('7')) {
    return true
  }

  return false
}

const isDoubleSidedGlue = (activies: string) => {
  if (activies.includes('6')) {
    return true
  }

  return false
}

const isFinalTrimActive = (activies: string) => {
  if (activies.includes('3')) {
    return true
  }
  
  return false
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
    totalRecordsOfAlcool: production.totalRecordsOfAlcool,
    totalRecordsOfFinalTrim: production.totalRecordsOfFinalTrim,
    totalRecordsOfDoubleSidedGlue: production.totalRecordsOfDoubleSidedGlue,
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
          metricsOnMonths[j].totalRecordsOfAlcool++;
          found = true;
          break;
        }

        if (isDoubleSidedGlue(productions[i].activities)) {
          metricsOnMonths[j].sumOfMinilitersOfDoubleSidedGlue += productions[i].minilitersOfDoubleSidedGlue
          metricsOnMonths[j].totalOfPiecesOfDoubleSidedGlue += productions[i].quantityProducedOnSidedGlue
          metricsOnMonths[j].totalRecordsOfDoubleSidedGlue++;
          found = true;
          break;
        }

        if (isFinalTrimActive(productions[i].activities)) {        
          metricsOnMonths[j].sumOfMinilitersOfFinalTrim += productions[i].minilitersOfFinalTrim
          metricsOnMonths[j].totalOfPiecesOfFinalTrim += productions[i].quantityProducedOnFinalTrim
          metricsOnMonths[j].totalRecordsOfFinalTrim++;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      if (isAlcoolActive(productions[i].activities)) {
        metricsOnMonths.push({
          activies: productions[i].activities,
          sumOfMinilitersOfAlcool: productions[i].minilitersOfAlcool,
          sumOfMinilitersOfFinalTrim: 0,
          sumOfMinilitersOfDoubleSidedGlue: 0,
          totalOfPiecesOfAlcool: productions[i].quantityProducedOnAlcool,
          totalOfPiecesOfFinalTrim: 0,
          totalOfPiecesOfDoubleSidedGlue: 0,
          date: productions[i].realizedIn,
          totalRecordsOfAlcool: 1,
          totalRecordsOfFinalTrim: 0,
          totalRecordsOfDoubleSidedGlue: 0,
        })
      }

      if (isDoubleSidedGlue(productions[i].activities)) {
        metricsOnMonths.push({
          activies: productions[i].activities,
          sumOfMinilitersOfAlcool: 0,
          sumOfMinilitersOfDoubleSidedGlue: productions[i].minilitersOfDoubleSidedGlue,
          sumOfMinilitersOfFinalTrim: 0,
          totalOfPiecesOfAlcool: 0,
          totalOfPiecesOfDoubleSidedGlue: productions[i].quantityProducedOnSidedGlue,
          totalOfPiecesOfFinalTrim: 0,
          date: productions[i].realizedIn,
          totalRecordsOfAlcool: 0,
          totalRecordsOfFinalTrim: 0,
          totalRecordsOfDoubleSidedGlue: 1,
        })
      }

      if (isFinalTrimActive(productions[i].activities)) {
        metricsOnMonths.push({
          activies: productions[i].activities,
          sumOfMinilitersOfAlcool: 0,
          sumOfMinilitersOfDoubleSidedGlue: 0,
          sumOfMinilitersOfFinalTrim: productions[i].minilitersOfFinalTrim,
          totalOfPiecesOfAlcool: 0,
          totalRecordsOfDoubleSidedGlue: 0,
          totalOfPiecesOfFinalTrim: productions[i].quantityProducedOnFinalTrim,
          date: productions[i].realizedIn,
          totalRecordsOfAlcool: 0,
          totalRecordsOfFinalTrim: 1,
          totalOfPiecesOfDoubleSidedGlue: 0,
        })
      }
    }
  }
  
  return metricsOnMonths.map((result) => {
    return formatReturnOnProductions(result)
  })
}