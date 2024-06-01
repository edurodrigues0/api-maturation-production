import { Router } from 'express'
import { getConsumeOnLastDay } from '../controllers/get-consume-on-last-day-controller'
import { getConsumeOnLastMonth } from '../controllers/get-consume-on-last-month-controller'
import { getConsumeOnLastSixMonth } from '../controllers/get-consume-on-last-six-months-controller'
import { getConsumeOnLastTwelveMonth } from '../controllers/get-consume-on-last-twelve-months-controller'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware'

const metricsRoutes = Router()

// metricsRoutes.use(ensureAuthenticated)

metricsRoutes.get('/metrics/consume-on-last-day', getConsumeOnLastDay)
metricsRoutes.get('/metrics/consume-on-last-month', getConsumeOnLastMonth)
metricsRoutes.get('/metrics/consume-on-last-six-months', getConsumeOnLastSixMonth)
metricsRoutes.get('/metrics/consume-on-last-twelve-months', getConsumeOnLastTwelveMonth)

export default metricsRoutes