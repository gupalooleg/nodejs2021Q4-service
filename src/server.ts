import { PORT } from './common/config';
import { fastify } from './app';

(async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
