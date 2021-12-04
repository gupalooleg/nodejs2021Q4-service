const MESSAGES = {
  RECORD_NOT_FOUND: 'A record with identifier "{0}" not found.',
};

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = { MESSAGES, HTTP_STATUS_CODE };
