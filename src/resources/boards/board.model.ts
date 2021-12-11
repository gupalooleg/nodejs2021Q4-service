import { v4 as uuid } from 'uuid';
import { BoardRecord, ColumnRecord } from '../../db';

class Board implements BoardRecord {
  id: string;

  title: string;

  columns: ColumnRecord[];

  constructor(board: BoardRecord) {
    this.id = board.id || uuid();
    this.title = board.title;
    this.columns = board.columns;
  }
}

export { Board };
