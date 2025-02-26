import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Score } from '../entity';

@Injectable()
export class ScoreService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Score) private scoreRepository: Repository<Score>
  ) {}

  async createScore(param: Partial<Score>): Promise<void> {
    const score = Score.from(param);

    const querryRunner = this.dataSource.createQueryRunner();

    await querryRunner.connect();
    await querryRunner.startTransaction();

    try {
      await querryRunner.manager.insert(Score, score);
    } catch (err) {
      await querryRunner.rollbackTransaction();
      throw err;
    } finally {
      await querryRunner.release();
    }
  }
}
