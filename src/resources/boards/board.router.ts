import { FastifyInstance } from 'fastify';
import * as boardService from './board.service';

/**
 * Configures all routes for the board entity
 *
 * @param fastify - Fastify instance
 */
async function routes(fastify: FastifyInstance) {
  fastify.get('/boards', boardService.getAll);

  fastify.get('/boards/:id', boardService.getById);

  fastify.post('/boards', boardService.create);

  fastify.put('/boards/:id', boardService.update);

  fastify.delete('/boards/:id', boardService.remove);
}

export { routes };
