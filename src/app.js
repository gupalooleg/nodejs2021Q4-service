const fastify = require('fastify')({ logger: true });
const path = require('path');

fastify.get('/', async () => 'REST service is running.');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

fastify.register(require('./resources/users/user.router'));

module.exports = fastify;
