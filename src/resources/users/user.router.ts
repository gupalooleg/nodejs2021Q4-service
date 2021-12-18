import { FastifyInstance } from 'fastify';
import * as userService from './user.service';

/**
 * Configures all routes for the user entity
 *
 * @param fastify - Fastify instance
 */
async function routes(fastify: FastifyInstance) {
  fastify.get('/users', userService.getAll);

  fastify.get('/users/:id', userService.getById);

  fastify.post('/users', userService.create);

  fastify.put('/users/:id', userService.update);

  fastify.delete('/users/:id', userService.remove);
}

export { routes };
