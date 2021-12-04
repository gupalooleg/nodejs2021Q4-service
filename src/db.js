const Board = [];
const Column = [];
const Task = [];
const User = [];
const Constraints = {
  fkConstrBoardTaskOnDeleteCascade: (boardId) => {
    Task.splice(
      0,
      Task.length,
      ...Task.filter((value) => value.boardId !== boardId)
    );
  },
  fkConstrUserTaskOnDeleteSetNull: (userId) =>
    Task.forEach((value) => {
      const task = value;
      task.userId = task.userId === userId ? null : task.userId;
    }),
};

module.exports = {
  Board,
  Column,
  Task,
  User,
  ...Constraints,
};
