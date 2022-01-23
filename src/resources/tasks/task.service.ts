import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from './task.model';
import { Board } from '../boards/board.model';
import { User } from '../users/user.model';
import { Column } from '../columns/column.model';
import * as taskRepo from './task.memory.repository';
import { HTTP_STATUS_CODE } from '../../utils/index';

type CustomRequest = FastifyRequest<{
  Params: { taskId: Task['id']; boardId: Board['id'] };
  Body: Task & { userId: User['id']; columnId: Column['id'] };
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
  const tasksToResponse = tasks.map((task) => Task.toResponse(task));

  rep.code(HTTP_STATUS_CODE.OK).send(tasksToResponse);
};

/**
 * Handles a request to get task by id
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const getById = async (req: CustomRequest, rep: FastifyReply) => {
  const { taskId } = req.params;
  const task = await taskRepo.getById(taskId);
  const taskToResponse = Task.toResponse(task);

  rep.code(HTTP_STATUS_CODE.OK).send(taskToResponse);
};

/**
 * Handles a request to create task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const create = async (req: CustomRequest, rep: FastifyReply) => {
  const task = new Task(
    req.body.id,
    req.body.title,
    req.body.order,
    req.body.description
  );
  const createdTask = await taskRepo.create(
    task,
    req.params.boardId,
    req.body.columnId,
    req.body.userId
  );
  const taskToResponse = Task.toResponse(createdTask);

  rep.code(HTTP_STATUS_CODE.CREATED).send(taskToResponse);
};

/**
 * Handles a request to update task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const update = async (req: CustomRequest, rep: FastifyReply) => {
  const task = new Task(
    req.params.taskId,
    req.body.title,
    req.body.order,
    req.body.description
  );
  const updatedTask = await taskRepo.update(
    task,
    req.params.boardId,
    req.body.columnId,
    req.body.userId
  );
  const taskToResponse = Task.toResponse(updatedTask);

  rep.code(HTTP_STATUS_CODE.OK).send(taskToResponse);
};

/**
 * Handles a request to delete task
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const remove = async (req: CustomRequest, rep: FastifyReply) => {
  const { taskId } = req.params;
  await taskRepo.remove(taskId);

  rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
};

export { getAll, getById, create, update, remove };
