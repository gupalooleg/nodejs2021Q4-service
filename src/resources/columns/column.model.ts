import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column as ColumnDecorator,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from '../boards/board.model';

/**
 * Class describing column data model
 */
@Entity({
  orderBy: {
    order: "ASC"
  }
})
class Column {
  @PrimaryColumn()
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
  board: Board | undefined;

  /**
   * Column class constructor
   *
   * @param id - column id
   * @param title - column title
   * @param order - column order
   * @param board - board
   * @returns Column object
   */
  constructor(id: string, title: string, order: number, board?: Board) {
    this.id = id || uuid();
    this.title = title;
    this.order = order;
    this.board = board;
  }
}

export { Column };
