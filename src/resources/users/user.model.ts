import { v4 as uuid } from 'uuid';
import { UserRecord } from '../../db';

/**
 * Class describing user data model
 */
class User implements UserRecord {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * User class constructor
   *
   * @param user - user data
   * @returns User object
   */
  constructor(user: Partial<UserRecord> = {}) {
    this.id = user.id || uuid();
    this.name = user.name || 'USER';
    this.login = user.login || 'user';
    this.password = user.password || 'P@55w0rd';
  }

  /**
   * Returns public user data(to HTTP response)
   *
   * @param user - user data model object
   * @returns public user data
   */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
