import { AppError } from "./app.error";

export class NoQueueJob extends AppError {
  constructor(public message: string = "Job not found") {
    super(message, 404);
  }
}
