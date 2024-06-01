import { Production } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { isSameMonth } from 'date-fns'

interface MetricOnMonthsProps {
  activies: string
  sumOfLitersOfAlcool: number
  sumOfLitersOfGlueFilm: number
  totalOfPiecesOfAlcool: number
  totalOfPiecesOfGlueFilm: number
  date: Date
  totalRecordsOfAlcool: number
  totalRecordsOfGlueFilm: number
}

const isAlcoolActive = (activies: string) => {
  if (activies.includes('7')) {
    return true
  }

  return false
}

const isGlueFilmActive = (activies: string) => {
  if (activies.includes('3')) {
    return true
  }
  
  return false
}

function formatReturnOnProductions(production: MetricOnMonthsProps) {
  return {
    id: randomUUID(),
    sumOfLitersOfAlcool: production.sumOfLitersOfAlcool,
    sumOfLitersOfGlueFilm: production.sumOfLitersOfGlueFilm,
    totalOfPiecesOfAlcool: production.totalOfPiecesOfAlcool,
    totalOfPiecesOfGlueFilm: production.totalOfPiecesOfGlueFilm,
    month: production.date.getMonth() + 1,
    year: production.date.getFullYear(),
    totalRecordsOfAlcool: production.totalRecordsOfAlcool,
    totalRecordsOfGlueFilm: production.totalRecordsOfGlueFilm,
  }
}

export function formatProductions(productions: Production[]) {
  const metricsOnMonths: MetricOnMonthsProps[] = [];

  for (let i = 0; i < productions.length; i++) {
    let found = false;

    for (let j = 0; j < metricsOnMonths.length; j++) {
      if (isSameMonth(metricsOnMonths[j].date, productions[i].realizedIn)) {
        if (isAlcoolActive(productions[i].activities)) { 
          metricsOnMonths[j].sumOfLitersOfAlcool += productions[i].litersOfProduct;
          metricsOnMonths[j].totalOfPiecesOfAlcool += productions[i].quantityProduced
          metricsOnMonths[j].totalRecordsOfAlcool++;
          found = true;
          break;
        }

        if (isGlueFilmActive(productions[i].activities)) {        
          metricsOnMonths[j].sumOfLitersOfGlueFilm += productions[i].litersOfProduct;
          metricsOnMonths[j].totalOfPiecesOfGlueFilm += productions[i].quantityProduced
          metricsOnMonths[j].totalRecordsOfGlueFilm++;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      if (isAlcoolActive(productions[i].activities)) {
        metricsOnMonths.push({
          activies: productions[i].activities,
          sumOfLitersOfAlcool: productions[i].litersOfProduct,
          sumOfLitersOfGlueFilm: 0,
          totalOfPiecesOfAlcool: productions[i].quantityProduced,
          totalOfPiecesOfGlueFilm: 0,
          date: productions[i].realizedIn,
          totalRecordsOfAlcool: 1,
          totalRecordsOfGlueFilm: 0,
        })
      }

      if (isGlueFilmActive(productions[i].activities)) {
        metricsOnMonths.push({
          activies: productions[i].activities,
          sumOfLitersOfAlcool: 0,
          sumOfLitersOfGlueFilm: productions[i].litersOfProduct,
          totalOfPiecesOfAlcool: 0,
          totalOfPiecesOfGlueFilm: productions[i].quantityProduced,
          date: productions[i].realizedIn,
          totalRecordsOfAlcool: 0,
          totalRecordsOfGlueFilm: 1,
        })
      }
    }
  }
  
  return metricsOnMonths.map((result) => {
    return formatReturnOnProductions(result)
  })
}