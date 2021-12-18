/**
 * Base class for all error classes in the application
 */
class AppError extends Error {
  /**
   * AppError class constructor
   *
   * @param message - error message
   * @returns AppError object
   */
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { AppError };
