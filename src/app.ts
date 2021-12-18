import Fastify from 'fastify';
import path from 'path';
import fastifySwagger from 'fastify-swagger';
import { routes as userRoutes } from './resources/users/user.router';
import { routes as boardRoutes } from './resources/boards/board.router';
import { routes as taskRoutes } from './resources/tasks/task.router';

const fastify = Fastify({ logger: true });

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: __dirname,
  },
});

fastify.register(userRoutes);

fastify.register(boardRoutes);

fastify.register(taskRoutes);

export { fastify };
