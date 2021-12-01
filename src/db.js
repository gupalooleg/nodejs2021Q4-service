module.exports = {
  Board: [],
  Column: [],
  Task: [],
  User: [],
  Constraints: {
    BoardTaskOnDeleteCascade: (id) => {
      this.Task = this.Task.filter((value) => value.id !== id);
    },
    UserTaskOnDeleteSetNull: (id) =>
      this.Task.forEach((value, index, array) => {
        if (value.id === id) {
          array[index].id = null;
        }
      }),
  },
};
