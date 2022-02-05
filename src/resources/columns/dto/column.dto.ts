import { IsNumber, IsString } from 'class-validator';

class ColumnDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly order: number;
}

export { ColumnDTO };
