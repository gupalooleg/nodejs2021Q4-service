import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from './user.model';
import * as userRepo from './user.memory.repository';
import { HTTP_STATUS_CODE, getHttpStatusCodeByError } from '../../utils/index';

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
  try {
    const users = await userRepo.getAll();
    const usersToResponse = users.map(User.toResponse);

    rep.code(HTTP_STATUS_CODE.OK).send(usersToResponse);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to get user by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const user = await userRepo.getById(req.params.id);
    const userToResponse = User.toResponse(user);

    rep.code(HTTP_STATUS_CODE.OK).send(userToResponse);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to create user
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const user = new User(req.body);
    await userRepo.create(user);
    const userToResponse = User.toResponse(user);

    rep.code(HTTP_STATUS_CODE.CREATED).send(userToResponse);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to update user
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const userReq = req.body;
    userReq.id = req.params.id;
    const user = new User(userReq);
    await userRepo.update(user);
    const userToResponse = User.toResponse(user);

    rep.code(HTTP_STATUS_CODE.OK).send(userToResponse);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to delete user
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    await userRepo.remove(req.params.id);

    rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

export { getAll, getById, create, update, remove };
