import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardDTO } from './dto/board.dto';
import { ResponseBoardDTO } from './dto/responseBoard.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
  ) {}

  async findBoardById(id: Board['id']) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found.`);
    }
    return board;
  }

  async findAll(): Promise<ResponseBoardDTO[]> {
    const boards = await this.boardsRepository.find({ relations: ['columns'] });
    return boards.map(Board.toResponse);
  }

  async findOneById(id: Board['id']): Promise<ResponseBoardDTO> {
    const board = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found.`);
    }
    return Board.toResponse(board);
  }

  async create(boardDTO: BoardDTO): Promise<ResponseBoardDTO> {
    const board = await this.boardsRepository.save(boardDTO);
    return Board.toResponse(board);
  }

  async update(id: Board['id'], boardDTO: BoardDTO): Promise<ResponseBoardDTO> {
    const board = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found.`);
    }

    board.title = boardDTO.title;
    const updatedBoard = await this.boardsRepository.save(board);
    return Board.toResponse(updatedBoard);
  }

  async remove(id: Board['id']): Promise<void> {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found.`);
    }
    await this.boardsRepository.remove(board);
  }
}
