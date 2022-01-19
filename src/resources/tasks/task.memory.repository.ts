import { getRepository } from 'typeorm';
import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { Task } from './task.model';
import { Board } from '../boards/board.model';
import { User } from '../users/user.model';
import { Column } from '../columns/column.model';

/**
 * Retrieve repository for Task entity
 *
 * @returns Repository for Task entity
 */
const getEntityRepository = () => getRepository(Task);

/**
 * Returns a board record from the DB by id
 *
 * @param id - board id
 * @returns board record
 */
const getBoardById = async (id: Board['id']) => {
  const board = await getRepository(Board).findOne(id);
  if (!board) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  return board;
};

/**
 * Returns a column record from the DB by id
 *
 * @param id - column id
 * @returns column record
 */
const getColumnById = async (id: Column['id']) => {
  const column = await getRepository(Column).findOne(id);
  if (!column) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  return column;
};

/**
 * Returns a user record from the DB by id
 *
 * @param id - user id
 * @returns user record
 */
const getUserById = async (id: User['id']) => {
  const user = await getRepository(User).findOne(id);
  if (!user) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  return user;
};

/**
 * Returns task records from the DB by board id
 *
 * @param boardId - board id
 * @returns task records
 */
const getAll = async (boardId: Board['id']) => {
  const board = await getBoardById(boardId);
  const tasks = await getEntityRepository().find({
    where: { board },
    relations: ['user', 'board', 'column'],
  });
  return tasks;
};

/**
 * Returns a task record from the DB by id and board id
 *
 * @param id - task id
 * @param boardId - board id
 * @returns task record
 */
const getById = async (id: Task['id']) => {
  const task = await getEntityRepository().findOne(id, {
    relations: ['user', 'board', 'column'],
  });
  if (!task) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return task;
};

/**
 * Creates a task record in the DB
 *
 * @param task - task data
 */
const create = async (
  task: Task,
  boardId: Board['id'],
  columnId: Column['id'],
  userId: User['id']
) => {
  const taskRec = task;

  const board = boardId ? await getBoardById(boardId) : undefined;
  if (board) {
    taskRec.board = board;
  }

  const column = columnId ? await getColumnById(columnId) : undefined;
  if (column) {
    taskRec.column = column;
  }

  const user = userId ? await getUserById(userId) : undefined;
  if (user) {
    taskRec.user = user;
  }

  const createdTask = await getEntityRepository().save(taskRec);
  return createdTask;
};

/**
 * Updates a task record in the DB
 *
 * @param task - task data
 */
const update = async (
  task: Task,
  boardId: Board['id'],
  columnId: Column['id'],
  userId: User['id']
) => {
  const taskRec = await getEntityRepository().findOne(task.id, {
    relations: ['user', 'board', 'column'],
  });
  if (!taskRec) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [task.id])
    );
  }

  taskRec.title = task.title;
  taskRec.order = task.order;
  taskRec.description = task.description;

  const board = boardId ? await getBoardById(boardId) : undefined;
  if (board) {
    taskRec.board = board;
  }

  const column = columnId ? await getColumnById(columnId) : undefined;
  if (column) {
    taskRec.column = column;
  }

  const user = userId ? await getUserById(userId) : undefined;
  if (user) {
    taskRec.user = user;
  }

  const updatedTask = await getEntityRepository().save(taskRec);
  return updatedTask;
};

/**
 * Deletes a task record in the DB by id and board id
 *
 * @param id - task id
 * @param boardId - board id
 */
const remove = async (id: Task['id']) => {
  const task = await getEntityRepository().findOne(id);
  if (!task) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  const deletedTask = await getEntityRepository().remove(task);
  return deletedTask;
};

export { getAll, getById, create, update, remove };
