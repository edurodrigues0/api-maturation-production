import { lastDayOfMonth as lastDayOfMonthFns, setDefaultOptions, startOfMonth, subDays, subMonths } from 'date-fns'

import { prisma } from '../../lib/prisma'
import { formatProductions } from '../../utils/format-productions-list'
import { MetricsRepository, Consume } from '../metrics'

export const PrismaMetricsRepository = (): MetricsRepository => {
  const activieNumberAcool = '7'
  const activieNumberGlueFilm = '3'

  return {
    async consumeOnLastDay(): Promise<Consume> {
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
          OR: [
            {
              activities: {
                contains: activieNumberAcool
              }
            },
            {
              activities: {
                contains: activieNumberGlueFilm
              }
            }
          ]
        }
      })

      const metricsOnLastDay = formatProductions(productions)

      return metricsOnLastDay[0]
    },

    async consumeOnLastMonth(): Promise<Consume> {
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

      const metricsOnLastMonth = formatProductions(productions)

      return metricsOnLastMonth[0]
    },

    async consumeOnLastSixMonths(): Promise<Consume[]> {
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

    async consumeOnLastTwelveMonths(): Promise<Consume[]> {
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