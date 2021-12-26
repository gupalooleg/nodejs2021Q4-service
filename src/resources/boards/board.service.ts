import { FastifyRequest, FastifyReply } from 'fastify';
import { Board } from './board.model';
import * as boardRepo from './board.memory.repository';
import { HTTP_STATUS_CODE } from '../../utils/index';

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
  const boards = await boardRepo.getAll();

  rep.code(HTTP_STATUS_CODE.OK).send(boards);
};

/**
 * Handles a request to get board by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  const board = await boardRepo.getById(req.params.id);

  rep.code(HTTP_STATUS_CODE.OK).send(board);
};

/**
 * Handles a request to create board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  const board = new Board(req.body);
  await boardRepo.create(board);

  rep.code(HTTP_STATUS_CODE.CREATED).send(board);
};

/**
 * Handles a request to update board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  const boardReq = req.body;
  boardReq.id = req.params.id;
  const board = new Board(boardReq);
  await boardRepo.update(board);

  rep.code(HTTP_STATUS_CODE.OK).send(board);
};

/**
 * Handles a request to delete board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  await boardRepo.remove(req.params.id);

  rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
};

export { getAll, getById, create, update, remove };
