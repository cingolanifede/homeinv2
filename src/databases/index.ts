import { configData } from '@/config';
import { dbConfig } from '@interfaces/db.interface';

const { host, user, port, pass, name }: dbConfig = configData.mainDatabase;

const url = `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`;

export const dbConnection = {
  url,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
