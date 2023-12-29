class AppError extends Error {
  status;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new AppError(404, message);
  }

  static internalServerError(message: string) {
    return new AppError(500, message);
  }

  static forbidden(message: string) {
    return new AppError(403, message);
  }
}

export default AppError;
