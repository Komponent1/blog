import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './game.user.entity';
import { Game } from './game.game.entity';

@Entity('Score')
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'uid' })
  uid: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column({ name: 'gid' })
  gid: string;
  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gid' })
  game: Game;

  @Column()
  score: number;

  static from(param: Partial<Score>): Score {
    const score = new Score();
    Object.assign(score, param);
    return score;
  }
}
