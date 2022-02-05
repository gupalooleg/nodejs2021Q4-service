import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ResponseUserDTO } from './dto/responseUser.dto';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  static toResponse(user: User): ResponseUserDTO {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
