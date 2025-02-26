import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameContoller } from './controller/game.controller';
import { ScoreService, UserService } from './service';
import { Game, Score, User } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Game, Score])],
  providers: [UserService, ScoreService],
  exports: [TypeOrmModule, UserService, ScoreService],
  controllers: [GameContoller],
})
export class GameModule {}
