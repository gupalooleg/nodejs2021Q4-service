import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUNDS, JWT_SECRET_KEY } from '../common/config';
import { User } from '../resources/users/user.model';
import { ServiceError, RepositoryError } from '../error/index';
import { HTTP_STATUS_CODE, MESSAGES } from './constants';
import * as userRepo from '../resources/users/user.memory.repository';

type token = {
  userId: string,
  login: string
};

function getPasswordHash(password: string){
  return bcrypt.hash(password, SALT_ROUNDS);
};

function isCorrectPassword(password: string, passwordHash: string){
  return bcrypt.compare(password, passwordHash);
};

function generateJWT(user: User){
  const payload = {
    userId: user.id,
    login: user.login
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
};

async function checkAuthentication(authorizationHeader: string | undefined){
  const token = authorizationHeader?.split(' ')[1];
  if (!token){
      throw new ServiceError(MESSAGES.UNAUTHORIZED, HTTP_STATUS_CODE.UNAUTHORIZED);
  }
 
   let decodedToken: token;
  try{
    decodedToken = jwt.verify(token, JWT_SECRET_KEY) as token;
  }catch(e){
    throw new ServiceError(MESSAGES.UNAUTHORIZED, HTTP_STATUS_CODE.UNAUTHORIZED);
  }

  try{
    await userRepo.getById(decodedToken.userId);
  }catch(e){
    if (e instanceof RepositoryError){
      throw new ServiceError(MESSAGES.UNAUTHORIZED, HTTP_STATUS_CODE.UNAUTHORIZED);
    }
      throw e;
    }     
};

export { getPasswordHash, isCorrectPassword, generateJWT, checkAuthentication };
