import { getRepository } from 'typeorm';
import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { User } from './user.model';

/**
 * Retrieve repository for User entity
 *
 * @returns Repository for User entity
 */
const getEntityRepository = () => getRepository(User);

/**
 * Returns all user records from the DB
 *
 * @returns all user records
 */
const getAll = async () => {
  const users = await getEntityRepository().find();
  return users;
}

/**
 * Returns a user record from the DB by id
 *
 * @param id - user id
 * @returns user record
 */
const getById = async (id: User['id']) => {
  const user = await getEntityRepository().findOne(id);
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
const create = async (user: User) => {
  const createdUser = await getEntityRepository().save(user);
  return createdUser;
};

/**
 * Updates a user record in the DB
 *
 * @param user - user data
 */
const update = async (user: User) => {
  const userRec = await getEntityRepository().findOne(user.id);
  if (!userRec) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [user.id])
    );
  }
  const updatedUser = await getEntityRepository().save(user);
  return updatedUser;
};

/**
 * Deletes a user record in the DB by id
 *
 * @param id - user id
 */
const remove = async (id: User['id']) => {
  const user = await getEntityRepository().findOne(id);
  if (!user) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  const deletedUser = await getEntityRepository().remove(user);
  return deletedUser;
};

export { getAll, getById, create, update, remove };
