import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Score } from '../entity';

@Injectable()
export class ScoreService {
  constructor(@InjectRepository(Score) private scoreRepository: Repository<Score>) {}

  async createScore(param: Partial<Score>): Promise<void> {
    const score = Score.from(param);
    try {
      await this.scoreRepository.save(score);
    } catch (e) {
      throw new Error(e);
    }
  }
}
