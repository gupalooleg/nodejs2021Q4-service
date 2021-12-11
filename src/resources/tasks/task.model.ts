import { v4 as uuid } from 'uuid';
import { TaskRecord } from '../../db';

class Task implements TaskRecord {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor(task: TaskRecord) {
    this.id = task.id || uuid();
    this.title = task.title;
    this.order = task.order;
    this.description = task.description;
    this.userId = task.userId;
    this.boardId = task.boardId;
    this.columnId = task.columnId;
  }
}

export { Task };
