import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * Class describing user data model
 */
@Entity()
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  /**
   * User class constructor
   *
   * @param id - user id
   * @param name - user name
   * @param login - user login
   * @param password - user password
   * @returns User object
   */
  constructor(id: string, name: string, login: string, password: string) {
    this.id = id || uuid();
    this.name = name;
    this.login = login;
    this.password = password;
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
