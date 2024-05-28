import { Response } from 'express'

export async function AppError(message: string, statusCode: number, response: Response) {
  response.status(statusCode).send({
    statusCode,
    message
  })
}