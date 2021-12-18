import { FastifyRequest, FastifyReply } from 'fastify';
import { Board } from './board.model';
import * as boardRepo from './board.memory.repository';
import { HTTP_STATUS_CODE, getHttpStatusCodeByError } from '../../utils/index';

type CustomRequest = FastifyRequest<{
  Params: { id: Board['id'] };
  Body: Board;
}>;

/**
 * Handles a request to get all boards
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getAll = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const boards = await boardRepo.getAll();

    rep.code(HTTP_STATUS_CODE.OK).send(boards);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to get board by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const board = await boardRepo.getById(req.params.id);

    rep.code(HTTP_STATUS_CODE.OK).send(board);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to create board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const board = new Board(req.body);
    await boardRepo.create(board);

    rep.code(HTTP_STATUS_CODE.CREATED).send(board);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to update board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const boardReq = req.body;
    boardReq.id = req.params.id;
    const board = new Board(boardReq);
    await boardRepo.update(board);

    rep.code(HTTP_STATUS_CODE.OK).send(board);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to delete board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    await boardRepo.remove(req.params.id);

    rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

export { getAll, getById, create, update, remove };
