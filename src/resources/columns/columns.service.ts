import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column) private columnsRepository: Repository<Column>,
  ) {}

  async findColumnById(id: Column['id']) {
    const column = await this.columnsRepository.findOne(id);
    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found.`);
    }
    return column;
  }
}
