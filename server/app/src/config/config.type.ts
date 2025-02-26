/**
 * 필요 key: value 세트
 */
export type ConfigTemplate = {
  key_name: string;
};
export type Config = {
  REDIS_READ_HOST: string;
  REDIS_WRITE_HOST: string;
  REDIS_PORT: string;
  DB_HOST: string;
  DB_PORT: string;
  MYSQL_USERNAME: string;
  MYSQL_ROOT_PASSWORD: string;
  MYSQL_DATABASE: string;
};
