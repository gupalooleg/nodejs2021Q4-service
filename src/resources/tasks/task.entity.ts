import {
  Column as ColumnDecarator,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { Column } from '../columns/column.entity';
import { User } from '../users/user.entity';
import { ResponseTaskDTO } from './dto/responseTask.dto';

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecarator()
  title: string;

  @ColumnDecarator()
  order: number;

  @ColumnDecarator()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board: Board;

  @ManyToOne(() => Column, (column) => column.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  column: Column;

  static toResponse(task: Task): ResponseTaskDTO {
    const { id, title, order, description } = task;
    return {
      id,
      title,
      order,
      description,
      userId: task.user?.id || null,
      boardId: task.board.id,
      columnId: task.column?.id || null,
    };
  }
}

export { Task };
