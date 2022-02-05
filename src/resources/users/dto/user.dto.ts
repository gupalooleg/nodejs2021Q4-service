import { IsString, MinLength } from 'class-validator';

class UserDTO {
  @IsString()
  readonly name: string;
  @IsString()
  readonly login: string;
  @IsString()
  @MinLength(5)
  readonly password: string;
}

export { UserDTO };
