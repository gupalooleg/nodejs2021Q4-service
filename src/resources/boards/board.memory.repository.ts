import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { Board, BoardRecord, fkConstrBoardTaskOnDeleteCascade } from '../../db';

/**
 * Returns all board records from the DB
 *
 * @returns all board records
 */
const getAll = async () => Board;

/**
 * Returns a board record from the DB by id
 *
 * @param id - board id
 * @returns board record
 */
const getById = async (id: BoardRecord['id']) => {
  const board = Board.find((value) => value.id === id);
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
const create = async (board: BoardRecord) => {
  Board.push(board);
};

/**
 * Updates a board record in the DB
 *
 * @param board - board data
 */
const update = async (board: BoardRecord) => {
  const index = Board.findIndex((value) => value.id === board.id);
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [board.id])
    );
  }
  Board[index] = board;
};

/**
 * Deletes a board record in the DB by id
 *
 * @param id - board id
 */
const remove = async (id: BoardRecord['id']) => {
  const index = Board.findIndex((value) => value.id === id);
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  Board.splice(index, 1);
  fkConstrBoardTaskOnDeleteCascade(id);
};

export { getAll, getById, create, update, remove };
