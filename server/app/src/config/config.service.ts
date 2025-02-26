import { Injectable } from '@nestjs/common';
import { Config } from './config.type';

@Injectable()
export class ConfigService {
  private config: Config;
  constructor(config: Config) {
    this.config = config;
  }

  public getConfig(): Config {
    return this.config;
  }
  /**
   * 각 module에 맞는 config 반환 함수 작성
   * EX> 이하 Redis 연결시 요구되는 config 반환 함수
   */
  public getIORedisConfig(type: 'read' | 'write'): any {
    return {
      host: type === 'read' ? this.config.REDIS_READ_HOST : this.config.REDIS_WRITE_HOST,
      port: this.config.REDIS_PORT,
      db: /** Redis DB 엽력, 통상 비운다 */ undefined,
      isCluster: false,
      commandTimeout: undefined,
    };
  }

  public getTypeOrmConfig({ entities }: { entities: any[] }): any {
    /**
     * 이하 내용은 env에서 불러오는 것으로 변경
     */
    return {
      type: 'mysql',
      host: this.config.DB_HOST,
      port: this.config.DB_PORT,
      username: this.config.MYSQL_USERNAME,
      password: this.config.MYSQL_ROOT_PASSWORD,
      database: this.config.MYSQL_DATABASE,
      entities,
      synchronize: false,
    };
  }

  public static LoadFromEnv(): ConfigService {
    const config = process.env as unknown as Config;
    return new ConfigService(config);
  }
}
