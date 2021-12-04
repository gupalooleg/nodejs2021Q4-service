const User = require('./user.model');
const userRepo = require('./user.memory.repository');
const {
  HTTP_STATUS_CODE,
  getHttpStatusCodeByError,
} = require('../../utils/index');

const getAll = async (req, rep) => {
  try {
    const users = await userRepo.getAll();
    const usersToResponse = users.map(User.toResponse);

    rep.code(HTTP_STATUS_CODE.OK).send(usersToResponse);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const getById = async (req, rep) => {
  try {
    const user = await userRepo.getById(req.params.id);
    const userToResponse = User.toResponse(user);

    rep.code(HTTP_STATUS_CODE.OK).send(userToResponse);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const create = async (req, rep) => {
  try {
    const user = new User(req.body);
    await userRepo.create(user);
    const userToResponse = User.toResponse(user);

    rep.code(HTTP_STATUS_CODE.CREATED).send(userToResponse);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const update = async (req, rep) => {
  try {
    const userReq = req.body;
    userReq.id = req.params.id;
    const user = new User(userReq);
    await userRepo.update(user);
    const userToResponse = User.toResponse(user);

    rep.code(HTTP_STATUS_CODE.OK).send(userToResponse);
  } catch (e) {
    rep.code(getHttpStatusCodeByError(e)).send(e.message);
  }
};

const remove = async (req, rep) => {
  try {
    await userRepo.remove(req.params.id);

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
