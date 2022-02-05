import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findByLogin(loginDTO.login);
    if (!user) {
      throw new ForbiddenException('User does not have permission to access.');
    }

    const isPasswordCorrect = await bcryptjs.compare(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ForbiddenException('User does not have permission to access.');
    }

    return this.generateJWT(user);
  }

  private async generateJWT(user: User) {
    const payload = { id: user.id, login: user.login };
    return { token: this.jwtService.sign(payload) };
  }
}
