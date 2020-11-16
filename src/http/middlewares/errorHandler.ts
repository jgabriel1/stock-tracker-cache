import { Request, Response, NextFunction } from 'express';

import HTTPException from '../../errors/HTTPException';

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof HTTPException) {
    return response.status(error.statusCode).json({
      error: { message: error.message },
    });
  }

  console.error(error);

  return response.status(500).json({
    error: { message: 'An unexpected error ocurred.' },
  });
}

export default errorHandler;
