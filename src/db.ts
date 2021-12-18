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

/**
 * Removes tasks placed on a specific board
 *
 * @remarks
 * Performs a role corresponding to the DB constraint with "ON DELETE CASCADE" property
 *
 * @param boardId - Board Id
 */
const fkConstrBoardTaskOnDeleteCascade = (boardId: BoardRecord['id']) => {
  Task.splice(
    0,
    Task.length,
    ...Task.filter((value) => value.boardId !== boardId)
  );
};

/**
 * Detaches the user from assigned tasks
 *
 * @remarks
 * Performs a role corresponding to the DB constraint with "ON DELETE SET NULL" property
 *
 * @param userId - User Id
 */
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
