export function tryCatchWrapper(controllerFn: any) {
  return async function (req: any, res: any, next: any) {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      console.error(`[Controller Error]:`, error);
      next(error); // Let the centralized error handler take care of it
    }
  };
}
