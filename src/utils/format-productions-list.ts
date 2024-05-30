import { Production } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { isSameMonth } from 'date-fns'

interface AverageOnMonthsProps {
  sumOfLiters: number
  totalOfPieces: number
  date: Date
  records: number
}

export function formatProductions(productions: Production[]) {
  const sumAverangeOnMonths: AverageOnMonthsProps[] = [];

  for (let i = 0; i < productions.length; i++) {
    let found = false;

    for (let j = 0; j < sumAverangeOnMonths.length; j++) {
      if (isSameMonth(sumAverangeOnMonths[j].date, productions[i].realizedIn)) {
        sumAverangeOnMonths[j].sumOfLiters += productions[i].litersOfProduct;
        sumAverangeOnMonths[j].totalOfPieces += productions[i].quantityProduced
        sumAverangeOnMonths[j].records++;
        found = true;
        break;
      }
    }

    if (!found) {
      sumAverangeOnMonths.push({
        sumOfLiters: productions[i].litersOfProduct,
        totalOfPieces: productions[i].quantityProduced,
        date: productions[i].realizedIn,
        records: 1,
      });
    }
  }

  return sumAverangeOnMonths.map((result) => {
    return {
      id: randomUUID(),
      sumOfLiters: result.sumOfLiters,
      totalOfPieces: result.totalOfPieces,
      month: result.date.getMonth() + 1,
      year: result.date.getFullYear(),
      length: result.records
    }
  })
}