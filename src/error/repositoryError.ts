import { AppError } from './appError';

/**
 * Base error class for errors raised in repository modules
 */
class RepositoryError extends AppError {
  /**
   * RepositoryError class constructor
   *
   * @param message - error message
   * @returns RepositoryError object
   */
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { RepositoryError };
