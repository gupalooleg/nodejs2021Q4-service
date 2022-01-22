import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../common/config'

function getPasswordHash(password: string){
    return bcrypt.hash(password, SALT_ROUNDS);
};

function isCorrectPassword(password: string, passwordHash: string){
    return bcrypt.compare(password, passwordHash);
};

export { getPasswordHash, isCorrectPassword };
