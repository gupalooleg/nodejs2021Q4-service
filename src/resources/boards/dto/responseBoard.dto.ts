import { ColumnDTO } from 'src/resources/columns/dto/column.dto';

class ResponseBoardDTO {
  readonly id: string;
  readonly title: string;
  readonly columns: ColumnDTO[];
}

export { ResponseBoardDTO };
