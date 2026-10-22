import { NextFunction, Request, Response } from 'express';

export function logger_global_middleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const date_request: Date = new Date(); // la hora esta mal, pero funciona
  console.log(
    `Estas ejecutando un metodo: ${req.method}, en la ruta: ${req.url}, con fecha datada en: ${date_request.toISOString()}`,
  );
  next();
}
