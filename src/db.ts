type ColumnRecord = {
  id: string;
  title: string;
  order: number;
};

type BoardRecord = {
  id: string;
  title: string;
  columns: ColumnRecord[];
};

type TaskRecord = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
};

type UserRecord = {
  id: string;
  name: string;
  login: string;
  password: string;
};

const Board: BoardRecord[] = [];
const Column: ColumnRecord[] = [];
const Task: TaskRecord[] = [];
const User: UserRecord[] = [];

const fkConstrBoardTaskOnDeleteCascade = (boardId: BoardRecord['id']) => {
  Task.splice(
    0,
    Task.length,
    ...Task.filter((value) => value.boardId !== boardId)
  );
};
const fkConstrUserTaskOnDeleteSetNull = (userId: UserRecord['id']) =>
  Task.forEach((value) => {
    const task = value;
    task.userId = task.userId === userId ? null : task.userId;
  });

export {
  Board,
  Column,
  Task,
  User,
  fkConstrBoardTaskOnDeleteCascade,
  fkConstrUserTaskOnDeleteSetNull,
  BoardRecord,
  ColumnRecord,
  TaskRecord,
  UserRecord,
};
