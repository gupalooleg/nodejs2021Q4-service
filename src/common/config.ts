import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PORT: string | number = process.env.PORT || 4000;
const { NODE_ENV } = process.env;
const { LOG_LEVEL } = process.env;
const { POSTGRES_HOST } = process.env;
const { POSTGRES_PORT } = process.env;
const { POSTGRES_DB } = process.env;
const { POSTGRES_USER } = process.env;
const { POSTGRES_PASSWORD } = process.env;
const { JWT_SECRET_KEY } = process.env;
const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const INIT_USER_LOGIN = process.env.INIT_USER_LOGIN || 'admin'; 
const INIT_USER_PASSWORD = process.env.INIT_USER_PASSWORD || 'admin'; 
const INIT_USER_NAME = process.env.INIT_USER_NAME || 'admin'; 

export {
  PORT,
  NODE_ENV,
  LOG_LEVEL,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  JWT_SECRET_KEY,
  AUTH_MODE,
  SALT_ROUNDS,
  INIT_USER_LOGIN,
  INIT_USER_PASSWORD,
  INIT_USER_NAME
};
