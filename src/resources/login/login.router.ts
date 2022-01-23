import { FastifyInstance } from 'fastify';
import * as loginService from './login.service';

/**
 * Configures all routes for the login
 *
 * @param fastify - Fastify instance
 */
async function routes(fastify: FastifyInstance) {
  fastify.post('/login', loginService.login);
}

export { routes };
