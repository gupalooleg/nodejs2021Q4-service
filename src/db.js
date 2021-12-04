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
    Task.forEach((value, index, array) => {
      if (value.userId === userId) {
        array[index].userId = null;
      }
    }),
};

module.exports = {
  Board,
  Column,
  Task,
  User,
  ...Constraints,
};
