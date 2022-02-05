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
import { Board } from '../boards/board.entity';
import { TaskDTO } from './dto/task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('boards')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':boardId/tasks')
  @HttpCode(HttpStatus.OK)
  findAll(@Param('boardId') boardId: Board['id']) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('taskId') taskId: Task['id']) {
    return this.tasksService.findOneById(taskId);
  }

  @Post(':boardId/tasks')
  @HttpCode(HttpStatus.CREATED)
  create(@Param('boardId') boardId: Board['id'], @Body() taskDTO: TaskDTO) {
    return this.tasksService.create(boardId, taskDTO);
  }

  @Put(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: Board['id'],
    @Param('taskId') taskId: Task['id'],
    @Body() taskDTO: TaskDTO,
  ) {
    return this.tasksService.update(boardId, taskId, taskDTO);
  }

  @Delete(':boardId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('taskId') taskId: Task['id']) {
    return this.tasksService.remove(taskId);
  }
}
