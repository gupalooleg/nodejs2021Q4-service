import { v4 as uuid } from 'uuid';
import { TaskRecord } from '../../db';

/**
 * Class describing task data model
 */
class Task implements TaskRecord {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  /**
   * Task class constructor
   *
   * @param task - task data
   * @returns Task object
   */
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
