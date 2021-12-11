import { RepositoryError } from '../error/index';
import { HTTP_STATUS_CODE } from './constants';

function getHttpStatusCodeByError(e: Error) {
  let httpStatusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  if (e instanceof RepositoryError) {
    httpStatusCode = HTTP_STATUS_CODE.NOT_FOUND;
  }

  return httpStatusCode;
}

export { getHttpStatusCodeByError };
