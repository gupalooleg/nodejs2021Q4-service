import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { User, UserRecord, fkConstrUserTaskOnDeleteSetNull } from '../../db';

/**
 * Returns all user records from the DB
 *
 * @returns all user records
 */
const getAll = async () => User;

/**
 * Returns a user record from the DB by id
 *
 * @param id - user id
 * @returns user record
 */
const getById = async (id: UserRecord['id']) => {
  const user = User.find((value) => value.id === id);
  if (!user) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return user;
};

/**
 * Creates a user record in the DB
 *
 * @param user - user data
 */
const create = async (user: UserRecord) => {
  User.push(user);
};

/**
 * Updates a user record in the DB
 *
 * @param user - user data
 */
const update = async (user: UserRecord) => {
  const index = User.findIndex((value) => value.id === user.id);
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [user.id])
    );
  }
  User[index] = user;
};

/**
 * Deletes a user record in the DB by id
 *
 * @param id - user id
 */
const remove = async (id: UserRecord['id']) => {
  const index = User.findIndex((value) => value.id === id);
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  User.splice(index, 1);
  fkConstrUserTaskOnDeleteSetNull(id);
};

export { getAll, getById, create, update, remove };
