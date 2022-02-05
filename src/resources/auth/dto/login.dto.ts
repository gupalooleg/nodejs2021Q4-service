import { IsString } from 'class-validator';

class LoginDTO {
  @IsString()
  readonly login: string;
  @IsString()
  readonly password: string;
}

export { LoginDTO };
