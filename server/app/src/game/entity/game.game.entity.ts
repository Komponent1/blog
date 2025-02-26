import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Score } from './game.score.entity';

@Entity('Game')
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  gid: string;

  @Column()
  name: string;

  @OneToMany(() => Score, score => score.game)
  scores: Score[];

  static from(param: Partial<Game>): Game {
    const game = new Game();
    Object.assign(game, param);
    return game;
  }
}
