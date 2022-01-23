import { AppError } from './appError';

/**
 * Base error class for errors raised in service modules
 */
class ServiceError extends AppError {

  httpCode: number;
  
  /**
   * ServiceError class constructor
   *
   * @param message - error message
   * @returns ServiceError object
   */
  constructor(message: string, httpCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = httpCode;
  }
}

export { ServiceError };
