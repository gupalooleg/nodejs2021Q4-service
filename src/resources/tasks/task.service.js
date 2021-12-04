const Task = require('./task.model');
const taskRepo = require('./task.memory.repository');
const {
  HTTP_STATUS_CODE,
  getHttpStatusCodeByError,
} = require('../../utils/index');

const getAll = async (req, rep) => {
  try {
    const { boardId } = req.params;
    const tasks = await taskRepo.getAll(boardId);

    rep.code(HTTP_STATUS_CODE.OK).send(tasks);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const getById = async (req, rep) => {
  try {
    const { taskId, boardId } = req.params;
    const task = await taskRepo.getById(taskId, boardId);

    rep.code(HTTP_STATUS_CODE.OK).send(task);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const create = async (req, rep) => {
  try {
    const { boardId } = req.params;
    const taskReq = req.body;
    taskReq.boardId = boardId;
    const task = new Task(taskReq);
    await taskRepo.create(task);

    rep.code(HTTP_STATUS_CODE.CREATED).send(task);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const update = async (req, rep) => {
  try {
    const { taskId, boardId } = req.params;
    const taskReq = req.body;
    taskReq.id = taskId;
    taskReq.boardId = boardId;
    const task = new Task(taskReq);
    await taskRepo.update(task);

    rep.code(HTTP_STATUS_CODE.OK).send(task);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const remove = async (req, rep) => {
  try {
    const { taskId, boardId } = req.params;
    await taskRepo.remove(taskId, boardId);

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
