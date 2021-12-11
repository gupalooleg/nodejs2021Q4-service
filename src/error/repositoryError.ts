import { AppError } from './appError';

class RepositoryError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { RepositoryError };
