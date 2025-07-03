/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * Fully generic async wrapper — works with any typed controller method.
 */
export function tryCatchWrapper<
  T extends (
    req: Request<any, any, any, any>,
    res: Response<any>,
    next: NextFunction,
  ) => Promise<any>,
>(controllerFn: T) {
  return (req: Parameters<T>[0], res: Parameters<T>[1], next: Parameters<T>[2]) => {
    controllerFn(req, res, next).catch(next);
  };
}
