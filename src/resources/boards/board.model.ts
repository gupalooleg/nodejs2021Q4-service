import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column as ColumnDecorator,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Column } from '../columns/column.model';

/**
 * Class describing board data model
 */
@Entity()
class Board {
  @PrimaryColumn()
  id: string;

  @ColumnDecorator()
  title: string;

  @OneToMany(() => Column, (columns) => columns.board, { cascade: true })
  columns: Column[] | undefined;

  /**
   * Board class constructor
   *
   * @param id - board id
   * @param title - board title
   * @param columns - columns
   * @returns Board object
   */
  constructor(id: string, title: string, columns?: Column[]) {
    this.id = id || uuid();
    this.title = title;
    this.columns = columns;
  }

  /**
 * Returns public board data(to HTTP response)
 *
 * @param board - board data model object
 * @returns public board data
 */
    static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export { Board };
