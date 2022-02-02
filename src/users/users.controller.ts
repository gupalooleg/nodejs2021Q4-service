import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: User['id']) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() userDTO: UserDTO) {
    return this.usersService.create(userDTO);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: User['id'], @Body() userDTO: UserDTO) {
    return this.usersService.update(id, userDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: User['id']) {
    return this.usersService.remove(id);
  }
}
