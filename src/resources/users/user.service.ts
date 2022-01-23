import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from './user.model';
import * as userRepo from './user.memory.repository';
import { HTTP_STATUS_CODE, getPasswordHash } from '../../utils/index';

type CustomRequest = FastifyRequest<{
  Params: { id: User['id'] };
  Body: User;
}>;

/**
 * Handles a request to get all users
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getAll = async (req: CustomRequest, rep: FastifyReply) => {
  const users = await userRepo.getAll();
  const usersToResponse = users.map((user) => User.toResponse(user));

  rep.code(HTTP_STATUS_CODE.OK).send(usersToResponse);
};

/**
 * Handles a request to get user by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  const user = await userRepo.getById(req.params.id);
  const userToResponse = User.toResponse(user);

  rep.code(HTTP_STATUS_CODE.OK).send(userToResponse);
};

/**
 * Handles a request to create user
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  const passwordHash = await getPasswordHash(req.body.password);
  const user = new User(
    req.body.id,
    req.body.name,
    req.body.login,
    passwordHash
  );
  const createdUser = await userRepo.create(user);
  const userToResponse = User.toResponse(createdUser);

  rep.code(HTTP_STATUS_CODE.CREATED).send(userToResponse);
};

/**
 * Handles a request to update user
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  const passwordHash = await getPasswordHash(req.body.password);
  const user = new User(
    req.params.id,
    req.body.name,
    req.body.login,
    passwordHash
  );
  const updatedUser = await userRepo.update(user);
  const userToResponse = User.toResponse(updatedUser);

  rep.code(HTTP_STATUS_CODE.OK).send(userToResponse);
};

/**
 * Handles a request to delete user
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  await userRepo.remove(req.params.id);

  rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
};

export { getAll, getById, create, update, remove };
