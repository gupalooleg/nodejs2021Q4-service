import {
  Entity,
  Column as ColumnDecorator,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity({
  orderBy: {
    order: 'ASC',
  },
})
class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator()
  title: string;

  @ColumnDecorator()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board: Board;
}

export { Column };
