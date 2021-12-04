const fastify = require('fastify')({ logger: true });
const path = require('path');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

fastify.register(require('./resources/users/user.router'));

fastify.register(require('./resources/boards/board.router'));

fastify.register(require('./resources/tasks/task.router'));

module.exports = fastify;
