import { PORT } from './common/config';
import { fastify } from './app';

/**
 * Run the HTTP server based on the Fastify web framework
 * {@link https://www.fastify.io/}
 */
(async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
