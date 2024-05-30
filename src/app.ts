import cors from 'cors'
import { ZodError } from 'zod'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import adimRoutes from './routes/admin-routes'
import productionRoutes from './routes/production-routes'
import colaboratorRoutes from './routes/colaborators-routes'
import metricsRoutes from './routes/metrics-routes'
import swaggerDocument from '../swagger.json'

export const app = express()

app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(express.json())
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(adimRoutes)
app.use(colaboratorRoutes)
app.use(productionRoutes)
app.use(metricsRoutes)

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return response.status(400)
    .json({
      message: 'Validation error.',
      issues: error.format()
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})