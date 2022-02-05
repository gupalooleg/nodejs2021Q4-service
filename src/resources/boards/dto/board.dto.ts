import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ColumnDTO } from 'src/resources/columns/dto/column.dto';

class BoardDTO {
  @IsString()
  readonly title: string;
  @IsArray()
  @ValidateNested()
  @Type(() => ColumnDTO)
  readonly columns: ColumnDTO[];
}

export { BoardDTO };
