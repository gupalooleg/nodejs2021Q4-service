import { v4 as uuid } from 'uuid';
import { BoardRecord, ColumnRecord } from '../../db';

/**
 * Class describing board data model
 */
class Board implements BoardRecord {
  id: string;

  title: string;

  columns: ColumnRecord[];

  /**
   * Board class constructor
   *
   * @param board - board data
   * @returns Board object
   */
  constructor(board: BoardRecord) {
    this.id = board.id || uuid();
    this.title = board.title;
    this.columns = board.columns;
  }
}

export { Board };
