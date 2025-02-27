import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Score } from './game.score.entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @Index({ unique: true })
  nickname: string;

  @Column()
  pw: string;

  @OneToMany(() => Score, score => score)
  scores: Score[];

  static from(param: Partial<User>): User {
    const user = new User();
    Object.assign(user, param);
    return user;
  }
}
