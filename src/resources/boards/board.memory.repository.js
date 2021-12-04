const { MESSAGES, formatString } = require('../../utils/index');
const { RepositoryError } = require('../../error/index');
const { Board, fkConstrBoardTaskOnDeleteCascade } = require('../../db');

const getAll = async () => Board;

const getById = async (id) => {
  const board = Board.find((value) => value.id === id);
  if (!board) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }

  return board;
};

const create = async (board) => Board.push(board);

const update = async (board) => {
  const index = Board.findIndex((value) => value.id === board.id);
  if (index === -1) {
    throw new RepositoryError(
      formatString(MESSAGES.RECORD_NOT_FOUND, [board.id])
    );
  }
  Board[index] = board;
};

const remove = async (id) => {
  const index = Board.findIndex((value) => value.id === id);
  if (index === -1) {
    throw new RepositoryError(formatString(MESSAGES.RECORD_NOT_FOUND, [id]));
  }
  Board.splice(index, 1);
  fkConstrBoardTaskOnDeleteCascade(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
