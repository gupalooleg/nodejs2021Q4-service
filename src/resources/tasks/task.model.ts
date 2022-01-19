import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column as ColumnDecorator,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.model';
import { Board } from '../boards/board.model';
import { Column } from '../columns/column.model';

/**
 * Class describing task data model
 */
@Entity()
class Task{
  @PrimaryColumn()
  id: string;

  @ColumnDecorator()
  title: string;

  @ColumnDecorator()
  order: number;

  @ColumnDecorator()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User | null | undefined;
  /*   userId: string | null; */

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board: Board | undefined;

  @ManyToOne(() => Column, (column) => column.id, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  column: Column | null | undefined;

  /**
   * Task class constructor
   *
   * @param id - task id
   * @param title - task title
   * @param order - task order
   * @param description - task description
   * @param user - user
   * @param board - board
   * @param column - column
   * @returns Task object
   */
  constructor(
    id: string,
    title: string,
    order: number,
    description: string,
    user?: User,
    board?: Board,
    column?: Column
  ) {
    this.id = id || uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.user = user;
    this.board = board;
    this.column = column;
  }

  /**
   * Returns public task data(to HTTP response)
   *
   * @param task - task data model object
   * @returns public task data
   */
  static toResponse(task: Task) {
    const { id, title, order, description } = task;

    return {
      id,
      title,
      order,
      description,
      userId: task.user?.id || null,
      boardId: task.board?.id || null,
      columnId: task.column?.id || null,
    };
  }
}

export { Task };
