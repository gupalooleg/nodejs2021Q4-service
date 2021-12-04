const taskService = require('./task.service');

async function routes(fastify) {
  fastify.get('/boards/:boardId/tasks', taskService.getAll);

  fastify.get('/boards/:boardId/tasks/:taskId', taskService.getById);

  fastify.post('/boards/:boardId/tasks', taskService.create);

  fastify.put('/boards/:boardId/tasks/:taskId', taskService.update);

  fastify.delete('/boards/:boardId/tasks/:taskId', taskService.remove);
}

module.exports = routes;
