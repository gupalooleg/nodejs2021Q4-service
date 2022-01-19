import { FastifyRequest, FastifyReply } from 'fastify';
import { Board } from './board.model';
import { Column } from '../columns/column.model';
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
  const boardsToResponse = boards.map((board) => Board.toResponse(board));

  rep.code(HTTP_STATUS_CODE.OK).send(boardsToResponse);
};

/**
 * Handles a request to get board by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  const board = await boardRepo.getById(req.params.id);
  const boardToResponse = Board.toResponse(board);
  
  rep.code(HTTP_STATUS_CODE.OK).send(boardToResponse);
};

/**
 * Handles a request to create board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  const columns: Column[] = [];
  const board = new Board(req.body.id, req.body.title, columns);
  req.body.columns?.forEach((c) =>
    columns.push(new Column(c.id, c.title, c.order))
  );
  const createdBoard = await boardRepo.create(board);
  const boardToResponse = Board.toResponse(createdBoard);

  rep.code(HTTP_STATUS_CODE.CREATED).send(boardToResponse);
};

/**
 * Handles a request to update board
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  const board = new Board(req.params.id, req.body.title);
  const updatedBoard = await boardRepo.update(board);
  const boardToResponse = Board.toResponse(updatedBoard);

  rep.code(HTTP_STATUS_CODE.OK).send(boardToResponse);
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
