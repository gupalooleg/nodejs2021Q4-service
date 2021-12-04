const Board = require('./board.model');
const boardRepo = require('./board.memory.repository');
const {
  HTTP_STATUS_CODE,
  getHttpStatusCodeByError,
} = require('../../utils/index');

const getAll = async (req, rep) => {
  try {
    const boards = await boardRepo.getAll();

    rep.code(HTTP_STATUS_CODE.OK).send(boards);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const getById = async (req, rep) => {
  try {
    const board = await boardRepo.getById(req.params.id);

    rep.code(HTTP_STATUS_CODE.OK).send(board);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const create = async (req, rep) => {
  try {
    const board = new Board(req.body);
    await boardRepo.create(board);

    rep.code(HTTP_STATUS_CODE.CREATED).send(board);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const update = async (req, rep) => {
  try {
    const boardReq = req.body;
    boardReq.id = req.params.id;
    const board = new Board(boardReq);
    await boardRepo.update(board);

    rep.code(HTTP_STATUS_CODE.OK).send(board);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const remove = async (req, rep) => {
  try {
    await boardRepo.remove(req.params.id);

    rep.code(HTTP_STATUS_CODE.NO_CONTENT).send();
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
