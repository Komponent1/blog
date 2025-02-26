import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { REDIS_READ_CLIENT, REDIS_WRITE_CLIENT } from './client.constant';
import { ConfigService } from 'src/config/config.service';
import { RedisClient } from './redis/redis.client';
/**
 * 외부 클라이언트 연결을 위한 모듈
 * EX> SMS, Redis, Push...
 */
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_READ_CLIENT,
      useFactory: async (service: ConfigService) => {
        const config = service.getIORedisConfig('read');
        return RedisClient.createClient(config);
      },
    },
    {
      provide: REDIS_WRITE_CLIENT,
      useFactory: async (service: ConfigService) => {
        const config = service.getIORedisConfig('write');
        return RedisClient.createClient(config);
      },
    },
  ],
  exports: [REDIS_READ_CLIENT, REDIS_WRITE_CLIENT],
})
export class ClientModule {}
