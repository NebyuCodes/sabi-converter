import { AppError } from "./app.error";

export class NoFileUploaded extends AppError {
  constructor(public message: string = "No file uploaded") {
    super(message, 400);
  }
}
