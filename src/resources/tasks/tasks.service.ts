import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/board.entity';
import { BoardsService } from '../boards/boards.service';
import { ColumnsService } from '../columns/columns.service';
import { UsersService } from '../users/users.service';
import { ResponseTaskDTO } from './dto/responseTask.dto';
import { TaskDTO } from './dto/task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private columnsService: ColumnsService,
  ) {}

  async findAll(boardId: Board['id']): Promise<ResponseTaskDTO[]> {
    const board = await this.boardsService.findBoardById(boardId);
    const tasks = await this.tasksRepository.find({
      where: { board },
      relations: ['user', 'board', 'column'],
    });
    return tasks.map(Task.toResponse);
  }

  async findOneById(id: Task['id']): Promise<ResponseTaskDTO> {
    const task = await this.tasksRepository.findOne(id, {
      relations: ['user', 'board', 'column'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    return Task.toResponse(task);
  }

  async create(
    boardId: Board['id'],
    taskDTO: TaskDTO,
  ): Promise<ResponseTaskDTO> {
    const board = await this.boardsService.findBoardById(boardId);

    const user = taskDTO.userId
      ? await this.usersService.findUserById(taskDTO.userId)
      : null;

    const column = taskDTO.columnId
      ? await this.columnsService.findColumnById(taskDTO.columnId)
      : null;

    const task = await this.tasksRepository.save({
      ...taskDTO,
      board,
      user,
      column,
    });
    return Task.toResponse(task);
  }

  async update(
    boardId: Board['id'],
    id: Task['id'],
    taskDTO: TaskDTO,
  ): Promise<ResponseTaskDTO> {
    const board = await this.boardsService.findBoardById(boardId);

    const task = await this.tasksRepository.findOne(id, {
      where: { board },
      relations: ['user', 'board', 'column'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    task.title = taskDTO.title;
    task.order = taskDTO.order;
    task.description = taskDTO.description;

    const user = taskDTO.userId
      ? await this.usersService.findUserById(taskDTO.userId)
      : null;

    const column = taskDTO.columnId
      ? await this.columnsService.findColumnById(taskDTO.columnId)
      : null;

    const updatedTask = await this.tasksRepository.save({
      ...task,
      user,
      column,
    });
    return Task.toResponse(updatedTask);
  }

  async remove(id: Task['id']): Promise<void> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    await this.tasksRepository.remove(task);
  }
}
