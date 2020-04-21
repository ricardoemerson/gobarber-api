class AppError {
  readonly message: string;
  readonly statusCode: number;

  constructor(message: string, statusCode = 422) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
