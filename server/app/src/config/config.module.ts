import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * ConfigModule은 ConfigService를 제공합니다.
 * ConfigService는 환경변수를 로드하고, 이를 사용할 수 있는 메소드를 제공합니다.
 */
@Module({
  providers: [{ provide: ConfigService, useFactory: () => ConfigService.LoadFromEnv() }],
  exports: [ConfigService],
})
export class ConfigModule {}
