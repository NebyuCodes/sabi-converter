import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { geh } from "../shared/geh";
import { v1 } from "./routes";
import { UnknownUrlError } from "../shared/errors";

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

v1();

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new UnknownUrlError());
});

app.use(geh);

export { app };
