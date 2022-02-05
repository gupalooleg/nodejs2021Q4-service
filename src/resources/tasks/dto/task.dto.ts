import { IsNumber, IsOptional, IsString } from 'class-validator';

class TaskDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly order: number;
  @IsString()
  readonly description: string;
  @IsOptional()
  @IsString()
  readonly userId: string;
  @IsOptional()
  @IsString()
  readonly boardId: string;
  @IsOptional()
  @IsString()
  readonly columnId: string;
}

export { TaskDTO };
