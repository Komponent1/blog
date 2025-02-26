import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { GameModule } from './game/game.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => {
        return service.getTypeOrmConfig({ entities: [__dirname + '/**/entity/*.entity{.ts,.js}'] });
      },
      inject: [ConfigService],
    }),
    GameModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
