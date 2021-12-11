import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { User, UserRecord, fkConstrUserTaskOnDeleteSetNull } from '../../db';

const getAll = async () => User;

const getById = async (id: UserRecord['id']) => {
  const user = User.find((value) => value.id === id);
  if (!user) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return user;
};

const create = async (user: UserRecord) => User.push(user);

const update = async (user: UserRecord) => {
  const index = User.findIndex((value) => value.id === user.id);
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [user.id])
    );
  }
  User[index] = user;
};

const remove = async (id: UserRecord['id']) => {
  const index = User.findIndex((value) => value.id === id);
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  User.splice(index, 1);
  fkConstrUserTaskOnDeleteSetNull(id);
};

export { getAll, getById, create, update, remove };
