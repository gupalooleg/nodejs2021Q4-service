import { getRepository } from 'typeorm';
import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { Board } from './board.model';

/**
 * Retrieve repository for Board entity
 *
 * @returns Repository for Board entity
 */
const getEntityRepository = () => getRepository(Board);

/**
 * Returns all board records from the DB
 *
 * @returns all board records
 */
const getAll = async () => {
  const boards = await getEntityRepository().find({ relations: ['columns'] });
  return boards;
}


/**
 * Returns a board record from the DB by id
 *
 * @param id - board id
 * @returns board record
 */
const getById = async (id: Board['id']) => {
  const board = await getEntityRepository().findOne(id, {
    relations: ['columns'],
  });
  if (!board) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  return board;
};

/**
 * Creates a board record in the DB
 *
 * @param board - board data
 */
const create = async (board: Board) => {
  const createdBoard = await getEntityRepository().save(board);
  return createdBoard;
};

/**
 * Updates a board record in the DB
 *
 * @param board - board data
 */
const update = async (board: Board) => {
  const boardRec = await getEntityRepository().findOne(board.id, {
    relations: ['columns'],
  });
  if (!boardRec) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [board.id])
    );
  }
  boardRec.title = board.title;
  const updatedBoard = await getEntityRepository().save(boardRec);
  return updatedBoard;
};

/**
 * Deletes a board record in the DB by id
 *
 * @param id - board id
 */
const remove = async (id: Board['id']) => {
  const board = await getEntityRepository().findOne(id);
  if (!board) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  const deletedBoard = await getEntityRepository().remove(board);
  return deletedBoard;
};

export { getAll, getById, create, update, remove };
