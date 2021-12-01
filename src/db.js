module.exports = {
  Board: [],
  Column: [],
  Task: [],
  User: [],
  Constraints: {
    fkBoardTaskOnDeleteCascade: (id) => {
      this.Task = this.Task.filter((value) => value.id !== id);
    },
    fkUserTaskOnDeleteSetNull: (id) =>
      this.Task.forEach((value, index, array) => {
        if (value.id === id) {
          array[index].id = null;
        }
      }),
  },
};
