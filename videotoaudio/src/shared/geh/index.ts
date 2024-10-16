import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { configs } from "../../config";
import { sendDevError } from "./send-dev.error";
import { sendProd } from "./send-prod.error";

export const geh = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || "ERROR";
  err.statusCode = err.statusCode || 500;

  // Local, Dev, QA, or Production error
  if (configs.env === "local" || configs.env === "development") {
    sendDevError(err, res);
  } else if (configs.env === "qa" || configs.env === "production") {
    sendProd(err, res);
  }
};
