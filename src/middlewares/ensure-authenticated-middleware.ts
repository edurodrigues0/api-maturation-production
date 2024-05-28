import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/AppError";
import { auth } from "../configs/auth";
import { JsonWebTokenError, verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader || typeof authHeader !== 'string') {
    return AppError('JWT Token Invalid.', 401, response)
  }

  const [_, token] = authHeader.split(" ")

  try {
    const { sub: adminId } = verify(token, auth.jwt.secret)

    if (!adminId || typeof adminId !== 'string') {
      return AppError('JWT Token Invalid,', 401, response)
    }

    request.user = {
      id: adminId
    }

    return next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return AppError('JWT Token Invalid.', 401, response)
    } else {
      return AppError('Error on verify JWT Token', 500, response)
    }
  }
}