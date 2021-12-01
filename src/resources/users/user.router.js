const User = require('./user.model');
const usersService = require('./user.service');

async function routes(fastify) {
  fastify.get('/users', async () => {
    const users = await usersService.getAll();
    return users.map(User.toResponse);
  });
}

module.exports = routes;
