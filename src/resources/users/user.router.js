const userService = require('./user.service');

async function routes(fastify) {
  fastify.get('/users', userService.getAll);

  fastify.get('/users/:id', userService.getById);

  fastify.post('/users', userService.create);

  fastify.put('/users/:id', userService.update);

  fastify.delete('/users/:id', userService.remove);
}

module.exports = routes;
