import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score, User } from '../entity';
import { UserResponse } from '../dto/game.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Score) private scoreRepository: Repository<Score>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async login(nickname: string, pw: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { nickname, pw },
    });
    return user;
  }

  async getUser(uid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { uid },
    });
    return user;
  }
  async getUserWithNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { nickname },
    });
    return user;
  }

  async updateUser(uid: string, param: Partial<User>): Promise<UserResponse> {
    const updatedUser = await this.userRepository.save({
      uid,
      ...param,
    });
    return updatedUser;
  }

  async getUserScores(uid: string): Promise<Score[]> {
    const scores = await this.scoreRepository.find({
      where: { uid },
    });
    return scores;
  }

  async getUserScoresSomeGame(uid: string, gid: string): Promise<Score[]> {
    const scores = await this.scoreRepository.find({
      relations: ['user', 'game'],
      where: { uid, gid },
    });
    return scores;
  }

  async createUser(param: Partial<User>): Promise<User> {
    const user = User.from(param);

    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }
}
