import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from './task.model';
import * as taskRepo from './task.memory.repository';
import { HTTP_STATUS_CODE, getHttpStatusCodeByError } from '../../utils/index';

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
  try {
    const { boardId } = req.params;
    const tasks = await taskRepo.getAll(boardId);

    rep.code(HTTP_STATUS_CODE.OK).send(tasks);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to get task by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const { taskId, boardId } = req.params;
    const task = await taskRepo.getById(taskId, boardId);

    rep.code(HTTP_STATUS_CODE.OK).send(task);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to create task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const { boardId } = req.params;
    const taskReq = req.body;
    taskReq.boardId = boardId;
    const task = new Task(taskReq);
    await taskRepo.create(task);

    rep.code(HTTP_STATUS_CODE.CREATED).send(task);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to update task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const { taskId, boardId } = req.params;
    const taskReq = req.body;
    taskReq.id = taskId;
    taskReq.boardId = boardId;
    const task = new Task(taskReq);
    await taskRepo.update(task);

    rep.code(HTTP_STATUS_CODE.OK).send(task);
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

/**
 * Handles a request to delete task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  try {
    const { taskId, boardId } = req.params;
    await taskRepo.remove(taskId, boardId);

    rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
  } catch (e) {
    if (e instanceof Error) {
      rep.code(getHttpStatusCodeByError(e)).send(e.message);
    }
  }
};

export { getAll, getById, create, update, remove };
