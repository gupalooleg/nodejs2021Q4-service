const { RepositoryError } = require('../error/index');
const { HTTP_STATUS_CODE } = require('./constants');

function getHttpStatusCodeByError(e) {
  let httpStatusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  if (e instanceof RepositoryError) {
    httpStatusCode = HTTP_STATUS_CODE.NOT_FOUND;
  }

  return httpStatusCode;
}

module.exports = getHttpStatusCodeByError;
