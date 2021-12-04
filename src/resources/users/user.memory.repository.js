const { MESSAGES, formatString } = require('../../utils/index');
const { RepositoryError } = require('../../error/index');
const { User, fkConstrUserTaskOnDeleteSetNull } = require('../../db');

const getAll = async () => User;

const getById = async (id) => {
  const user = User.find((value) => value.id === id);
  if (!user) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return user;
};

const create = async (user) => User.push(user);

const update = async (user) => {
  const index = User.findIndex((value) => value.id === user.id);
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [user.id])
    );
  }
  User[index] = user;
};

const remove = async (id) => {
  const index = User.findIndex((value) => value.id === id);
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  User.splice(index, 1);
  fkConstrUserTaskOnDeleteSetNull(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
