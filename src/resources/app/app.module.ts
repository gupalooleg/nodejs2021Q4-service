import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Board } from '../boards/board.entity';
import { BoardsModule } from '../boards/boards.module';
import { Task } from '../tasks/task.entity';
import { Column } from '../columns/column.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Column, Task],
      synchronize: false,
      migrationsRun: true,
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
