import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../users/user.model';
import * as userRepo from '../users/user.memory.repository';
import { HTTP_STATUS_CODE, MESSAGES, isCorrectPassword, generateJWT } from '../../utils/index';
import { ServiceError } from '../../error/index';

type CustomRequest = FastifyRequest<{
  Body: { login: User['id'], password: User['password']};
}>;

/**
 * Handles a login request
 *
 * @param req - Custom request(base on Fastify request)
 * @param rep - Fastify reply
 */
const login = async (req: CustomRequest, rep: FastifyReply) => {
  const user = await userRepo.getByLogin(req.body.login);
  if(!user){
    throw new ServiceError(MESSAGES.FORBIDDEN, HTTP_STATUS_CODE.FORBIDDEN);
  }
  
  const isPasswordCorrect = await isCorrectPassword(req.body.password, user.password);
  if (!isPasswordCorrect){
    throw new ServiceError(MESSAGES.FORBIDDEN, HTTP_STATUS_CODE.FORBIDDEN);    
  }

  const jwt = generateJWT(user);
  rep.code(HTTP_STATUS_CODE.OK).send({token: jwt});
};

export { login };