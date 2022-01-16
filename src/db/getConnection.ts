import { createConnection } from 'typeorm';
import { connectionOptions } from './ormconfig';

const getConnection = async () => {
  await createConnection(connectionOptions);
};

export { getConnection };
