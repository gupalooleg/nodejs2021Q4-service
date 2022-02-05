import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { UserDTO } from './dto/user.dto';
import { ResponseUserDTO } from './dto/responseUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUserById(id: User['id']) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async findAll(): Promise<ResponseUserDTO[]> {
    const users = await this.usersRepository.find();
    return users.map(User.toResponse);
  }

  async findByLogin(login: User['login']): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { login: login },
    });
    return user;
  }

  async findOneById(id: User['id']): Promise<ResponseUserDTO> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return User.toResponse(user);
  }

  async create(userDTO: UserDTO): Promise<ResponseUserDTO> {
    const passwordHash = await bcryptjs.hash(
      userDTO.password,
      Number(process.env.SALT_ROUNDS),
    );
    const user = await this.usersRepository.save({
      ...userDTO,
      password: passwordHash,
    });
    return User.toResponse(user);
  }

  async update(id: User['id'], userDTO: UserDTO): Promise<ResponseUserDTO> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    const passwordHash = await bcryptjs.hash(
      userDTO.password,
      Number(process.env.SALT_ROUNDS),
    );
    const updatedUser = await this.usersRepository.save({
      ...user,
      ...userDTO,
      password: passwordHash,
    });
    return User.toResponse(updatedUser);
  }

  async remove(id: User['id']): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    await this.usersRepository.remove(user);
  }
}
