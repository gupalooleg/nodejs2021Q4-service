import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from '../common/config';
import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { Column } from '../resources/columns/column.model';
import { Task } from '../resources/tasks/task.model';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Board, Column, Task],
  synchronize: true,
  logging: false,
};

export { connectionOptions };
