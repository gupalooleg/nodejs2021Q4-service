import { FastifyInstance } from 'fastify';
import * as taskService from './task.service';

async function routes(fastify: FastifyInstance) {
  fastify.get('/boards/:boardId/tasks', taskService.getAll);

  fastify.get('/boards/:boardId/tasks/:taskId', taskService.getById);

  fastify.post('/boards/:boardId/tasks', taskService.create);

  fastify.put('/boards/:boardId/tasks/:taskId', taskService.update);

  fastify.delete('/boards/:boardId/tasks/:taskId', taskService.remove);
}

export { routes };
