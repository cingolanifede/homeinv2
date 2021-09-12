import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    API_PORT: str(),
    DB_MAIN_HOST: str(),
    DB_MAIN_USER: str(),
    DB_MAIN_PASS: str(),
    DB_MAIN_NAME: str(),
    DB_MAIN_PORT: str(),
    TOKEN_SECRET: str(),
  });
};

export default validateEnv;
