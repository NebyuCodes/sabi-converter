import { AppError } from "./app.error";

export class NotBuffer extends AppError {
  constructor(public message: string = "The resource is not a valid buffer.") {
    super(message, 400);
  }
}
