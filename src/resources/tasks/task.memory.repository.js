const { MESSAGES, formatString } = require('../../utils/index');
const { RepositoryError } = require('../../error/index');
const { Task } = require('../../db');

const getAll = async (boardId) =>
  Task.filter((value) => value.boardId === boardId);

const getById = async (id, boardId) => {
  const task = Task.find(
    (value) => value.id === id && value.boardId === boardId
  );
  if (!task) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return task;
};

const create = async (task) => Task.push(task);

const update = async (task) => {
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

const remove = async (id, boardId) => {
  const index = Task.findIndex(
    (value) => value.id === id && value.boardId === boardId
  );
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  Task.splice(index, 1);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
