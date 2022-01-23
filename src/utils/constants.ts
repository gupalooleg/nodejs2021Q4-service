enum MESSAGES {
  RECORD_NOT_FOUND = 'A record with identifier "{0}" not found.',
  FORBIDDEN = 'You don\'t have permission to access.',
  UNAUTHORIZED = 'You authorization failed.'
}

enum HTTP_STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export { MESSAGES, HTTP_STATUS_CODE };
