import * as userRepo from '../resources/users/user.memory.repository';
import { User } from '../resources/users/user.model';
import { getPasswordHash } from './authHelper';
import { INIT_USER_LOGIN, INIT_USER_PASSWORD, INIT_USER_NAME } from '../common/config';

/**
 * Create initial user
 */
async function createInitialDBUser (){
    const passwordHash = await getPasswordHash(INIT_USER_PASSWORD);
    const user = new User(undefined, INIT_USER_NAME, INIT_USER_LOGIN, passwordHash);
    const createdUser = await userRepo.create(user);
    return createdUser; 
};

export { createInitialDBUser }