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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { BoardDTO } from './dto/board.dto';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: Board['id']) {
    return this.boardsService.findOneById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() boardDTO: BoardDTO) {
    return this.boardsService.create(boardDTO);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: Board['id'], @Body() boardDTO: BoardDTO) {
    return this.boardsService.update(id, boardDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Board['id']) {
    return this.boardsService.remove(id);
  }
}
