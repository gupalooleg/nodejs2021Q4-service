import { v4 as uuid } from 'uuid';
import { UserRecord } from '../../db';

class User implements UserRecord {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor(user: Partial<UserRecord> = {}) {
    this.id = user.id || uuid();
    this.name = user.name || 'USER';
    this.login = user.login || 'user';
    this.password = user.password || 'P@55w0rd';
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
