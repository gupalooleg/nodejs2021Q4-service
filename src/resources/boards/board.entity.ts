import {
  Column as ColumnDecorator,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Column } from '../columns/column.entity';
import { ResponseBoardDTO } from './dto/responseBoard.dto';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator()
  title: string;

  @OneToMany(() => Column, (columns) => columns.board, { cascade: true })
  columns: Column[];

  static toResponse(board: Board): ResponseBoardDTO {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export { Board };
