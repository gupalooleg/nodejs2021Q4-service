import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { Task, TaskRecord } from '../../db';

/**
 * Returns task records from the DB by board id
 *
 * @param boardId - board id
 * @returns task records
 */
const getAll = async (boardId: TaskRecord['boardId']) =>
  Task.filter((value) => value.boardId === boardId);

/**
 * Returns a task record from the DB by id and board id
 *
 * @param id - task id
 * @param boardId - board id
 * @returns task record
 */
const getById = async (
  id: TaskRecord['id'],
  boardId: TaskRecord['boardId']
) => {
  const task = Task.find(
    (value) => value.id === id && value.boardId === boardId
  );
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
const create = async (task: TaskRecord) => {
  Task.push(task);
};

/**
 * Updates a task record in the DB
 *
 * @param task - task data
 */
const update = async (task: TaskRecord) => {
  const index = Task.findIndex(
    (value) => value.id === task.id && value.boardId === task.boardId
  );
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [task.id])
    );
  }
  Task[index] = task;
};

/**
 * Deletes a task record in the DB by id and board id
 *
 * @param id - task id
 * @param boardId - board id
 */
const remove = async (id: TaskRecord['id'], boardId: TaskRecord['boardId']) => {
  const index = Task.findIndex(
    (value) => value.id === id && value.boardId === boardId
  );
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  Task.splice(index, 1);
};

export { getAll, getById, create, update, remove };
