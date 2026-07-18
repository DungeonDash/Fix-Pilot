import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

type ValidationTarget = "body" | "query" | "params";

export function validate(
  schema: ZodType<any>,
  target: ValidationTarget = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);

      req[target] = parsed;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.flatten(),
        });
      }

      next(error);
    }
  };
}