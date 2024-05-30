import { lastDayOfMonth as lastDayOfMonthFns, setDefaultOptions, startOfMonth, subDays, subMonths } from 'date-fns'

import { prisma } from '../../lib/prisma'
import { formatProductions } from '../../utils/format-productions-list'
import { MetricsRepository } from '../metrics'

export const PrismaMetricsRepository = (): MetricsRepository => {
  return {
    async consumeOnLastDay(): Promise<{
      consumeAverangeOnLastDay: number,
      totalOfPiecesOnLastDay: number
    }> {
      const currentDate = new Date()

      const yesterday = subDays(currentDate, 1)
    
      const startOfYesterday = new Date(yesterday)
      startOfYesterday.setUTCHours(0, 0, 0, 0)
    
      const endOfYesterday = new Date(yesterday)
      endOfYesterday.setUTCHours(23, 59, 59, 999)

      const productions = await prisma.production.findMany({
        where: {
          litersOfProduct: {
            gte: 1
          },
          realizedIn: {
            gte: startOfYesterday,
            lte: endOfYesterday,
          },
        }
      })

      const consumeAverangeOnLastDay = productions.reduce((acc, production) => acc + production.litersOfProduct, 0) / productions.length
      const totalOfPiecesOnLastDay = productions.reduce((acc, production) => acc + production.quantityProduced, 0)

      return {
        consumeAverangeOnLastDay,
        totalOfPiecesOnLastDay
      }
    },

    async consumeOnLastMonth(): Promise<{
      consumeAverangeOnLastMonth: number,
      totalOfPiecesOnLastMonth: number
    }> {
      const currentDate = new Date()
      const lastMonth = subMonths(currentDate, 1)

      const firstDayOfMonth = startOfMonth(lastMonth)
      firstDayOfMonth.setUTCHours(0, 0, 0, 0)

      const lastDayOfMonth = lastDayOfMonthFns(lastMonth)
      lastDayOfMonth.setUTCHours(23, 59, 59, 999)

      const productions = await prisma.production.findMany({
        where: {
          litersOfProduct: {
            gte: 1
          },
          realizedIn: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        }
      })

      const consumeAverangeOnLastMonth = productions
      .reduce(
        (acc, production) => acc 
        + production.litersOfProduct, 0
      ) / productions.length

      const totalOfPiecesOnLastMonth = productions.reduce(
        (acc, production) => acc 
        + production.quantityProduced, 0
      )

      Number(consumeAverangeOnLastMonth.toFixed(2))
      
      return {
        consumeAverangeOnLastMonth,
        totalOfPiecesOnLastMonth
      }
    },

    async consumeOnLastSixMonths() {
      const currentDate = new Date()
      const lastSixMonths = startOfMonth(subMonths(currentDate, 5))
      lastSixMonths.setUTCHours(0, 0, 0, 0)

      const productions = await prisma.production.findMany({
        where: {
          litersOfProduct: {
            gte: 1
          },
          realizedIn: {
            gte: lastSixMonths,
            lte: currentDate
          },
        },
        orderBy: {
          realizedIn: 'desc',
        }
      })

      const consumeOnLastSixMonths = formatProductions(productions)

      return consumeOnLastSixMonths
    },

    async consumeOnLastTwelveMonths() {
      const currentDate = new Date()
      const lastSixMonths = startOfMonth(subMonths(currentDate, 12))
      lastSixMonths.setUTCHours(0, 0, 0, 0)

      const productions = await prisma.production.findMany({
        where: {
          litersOfProduct: {
            gte: 1
          },
          realizedIn: {
            gte: lastSixMonths,
            lte: currentDate
          },
        },
        orderBy: {
          realizedIn: 'desc',
        }
      })

      const consumeOnLastSixMonths = formatProductions(productions)

      return consumeOnLastSixMonths
    },
  }
}