const boardService = require('./board.service');

async function routes(fastify) {
  fastify.get('/boards', boardService.getAll);

  fastify.get('/boards/:id', boardService.getById);

  fastify.post('/boards', boardService.create);

  fastify.put('/boards/:id', boardService.update);

  fastify.delete('/boards/:id', boardService.remove);
}

module.exports = routes;
