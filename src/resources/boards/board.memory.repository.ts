import { MESSAGES, formatString } from '../../utils/index';
import { RepositoryError } from '../../error/index';
import { Board, BoardRecord, fkConstrBoardTaskOnDeleteCascade } from '../../db';

const getAll = async () => Board;

const getById = async (id: BoardRecord['id']) => {
  const board = Board.find((value) => value.id === id);
  if (!board) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return board;
};

const create = async (board: BoardRecord) => Board.push(board);

const update = async (board: BoardRecord) => {
  const index = Board.findIndex((value) => value.id === board.id);
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [board.id])
    );
  }
  Board[index] = board;
};

const remove = async (id: BoardRecord['id']) => {
  const index = Board.findIndex((value) => value.id === id);
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  Board.splice(index, 1);
  fkConstrBoardTaskOnDeleteCascade(id);
};

export { getAll, getById, create, update, remove };
