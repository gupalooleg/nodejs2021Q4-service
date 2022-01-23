import { PORT } from './common/config';
import { fastify } from './app';
import { logger } from './utils/index';

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception');
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  logger.fatal(reason, 'Unhandled rejection');
  process.exit(1);
});

/**
 * Run the HTTP server based on the Fastify web framework
 * {@link https://www.fastify.io/}
 */
(async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0');
  } catch (err) {
    fastify.log.fatal(err);
    process.exit(1);
  }
})();
