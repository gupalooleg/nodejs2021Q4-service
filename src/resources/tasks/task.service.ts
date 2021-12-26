import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from './task.model';
import * as taskRepo from './task.memory.repository';
import { HTTP_STATUS_CODE } from '../../utils/index';

type CustomRequest = FastifyRequest<{
  Params: { taskId: Task['id']; boardId: Task['boardId'] };
  Body: Task;
}>;

/**
 * Handles a request to get all tasks
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getAll = async (req: CustomRequest, rep: FastifyReply) => {
  const { boardId } = req.params;
  const tasks = await taskRepo.getAll(boardId);

  rep.code(HTTP_STATUS_CODE.OK).send(tasks);
};

/**
 * Handles a request to get task by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  const { taskId, boardId } = req.params;
  const task = await taskRepo.getById(taskId, boardId);

  rep.code(HTTP_STATUS_CODE.OK).send(task);
};

/**
 * Handles a request to create task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  const { boardId } = req.params;
  const taskReq = req.body;
  taskReq.boardId = boardId;
  const task = new Task(taskReq);
  await taskRepo.create(task);

  rep.code(HTTP_STATUS_CODE.CREATED).send(task);
};

/**
 * Handles a request to update task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  const { taskId, boardId } = req.params;
  const taskReq = req.body;
  taskReq.id = taskId;
  taskReq.boardId = boardId;
  const task = new Task(taskReq);
  await taskRepo.update(task);

  rep.code(HTTP_STATUS_CODE.OK).send(task);
};

/**
 * Handles a request to delete task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  const { taskId, boardId } = req.params;
  await taskRepo.remove(taskId, boardId);

  rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
};

export { getAll, getById, create, update, remove };
