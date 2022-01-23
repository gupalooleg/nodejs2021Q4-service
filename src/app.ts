import Fastify from 'fastify';
import path from 'path';
import fastifySwagger from 'fastify-swagger';
import { routes as userRoutes } from './resources/users/user.router';
import { routes as boardRoutes } from './resources/boards/board.router';
import { routes as taskRoutes } from './resources/tasks/task.router';
import { routes as loginRoutes } from './resources/login/login.router';
import { logger, getHttpStatusCodeByError, createInitialDBUser, checkAuthentication } from './utils/index';
import { getConnection } from './db/getConnection';

const fastify = Fastify({ logger });

fastify.setErrorHandler((err, req, rep) => {
  req.log.error(err);
  rep.code(getHttpStatusCodeByError(err)).send(err.message);
});

fastify.addHook('onRequest', async (req) => {
  if(req.url !== '/login' && req.url !== '/' &&
     !req.url.startsWith('/doc') && !req.url.startsWith('/./doc')){
    await checkAuthentication(req.headers.authorization);
  }
});

fastify.addHook('preHandler', async (req) => {
  if (req.body) {
    req.log.info({ body: req.body });
  }
});

fastify.addHook('onReady', async () => {
  try {
    await getConnection();
    await createInitialDBUser();
    fastify.log.info('DB connection established.');
  } catch (err) {
    fastify.log.fatal(err, 'DB connection error.');
  }
});

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

fastify.register(loginRoutes);

export { fastify };
