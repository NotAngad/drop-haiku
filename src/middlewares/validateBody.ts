/** Library */
import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const validateBody = (schema: Joi.ObjectSchema<any>): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = req?.body;

    const { error } = schema.validate(payload, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: true,
        message: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }

    next();
  };
};

export default validateBody;
