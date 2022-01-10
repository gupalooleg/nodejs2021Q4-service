import { pino, LoggerOptions } from 'pino';
import { LOG_LEVEL } from '../common/config';

const loggerOptions: LoggerOptions = {
  serializers: {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        parameters: request.params,
        query: request.query,
      };
    },
    res(reply) {
      return {
        statusCode: reply.statusCode,
      };
    },
  },
  transport: {
    targets: [
      {
        level: LOG_LEVEL as pino.LevelWithSilent,
        target: 'pino/file',
        options: {
          destination: './logs/app.log',
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: './logs/appError.log',
        },
      },
    ],
  },
};

const logger = pino(loggerOptions);

export { logger };
