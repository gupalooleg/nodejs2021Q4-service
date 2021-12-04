const AppError = require('./appError');

class RepositoryError extends AppError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = RepositoryError;
