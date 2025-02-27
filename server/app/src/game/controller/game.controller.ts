import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserAlreadyExistsError, UserNotFoundError } from '../exception/game.user.exception';
import { ScoreService, UserService } from '../service';
import { ScoreRequest, UserRequest, UserResponse, UserScoreResponse } from '../dto/game.user.dto';

@Controller('user')
export class GameContoller {
  constructor(
    private userService: UserService,
    private scoreService: ScoreService
  ) {}

  @Get()
  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':nickname/login/:pw')
  async login(@Param('nickname') nickname: string, @Param('pw') pw: string): Promise<UserResponse> {
    const user = await this.userService.login(nickname, pw);
    return user;
  }

  @Get(':uid')
  async getUser(@Param('uid') uid: string): Promise<UserResponse | undefined> {
    try {
      const user = await this.userService.getUser(uid);
      return user;
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }
  @Get(':uid/score')
  async getUserScore(@Param('uid') uid: string): Promise<UserScoreResponse[]> {
    try {
      const scores = await this.userService.getUserScores(uid);
      const response = scores.map(score => {
        return {
          uid: score.user.uid,
          nickname: score.user.nickname,
          gid: score.game.gid,
          game_name: score.game.name,
          score: score.score,
        };
      });
      return response;
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }
  @Get(':uid/score/:gid')
  async getUserScoreSomeGame(@Param('uid') uid: string, @Param('gid') gid: string): Promise<UserScoreResponse[]> {
    try {
      const scores = await this.userService.getUserScoresSomeGame(uid, gid);
      const response = scores.map(score => {
        return {
          uid: score.user.uid,
          nickname: score.user.nickname,
          gid: score.game.gid,
          game_name: score.game.name,
          score: score.score,
        };
      });
      return response;
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }
  @Post()
  async createUser(@Body() body: UserRequest): Promise<UserResponse> {
    try {
      const user = await this.userService.createUser({ nickname: body.nickname, pw: body.pw });
      return user;
    } catch (err) {
      throw new UserAlreadyExistsError(err);
    }
  }
  @Patch(':uid')
  async updateUser(@Param('uid') uid: string, @Query('nickname') nickname: string): Promise<UserResponse> {
    try {
      const updatedUser = await this.userService.updateUser(uid, { nickname });
      return updatedUser;
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }

  @Post('score')
  async createScore(@Body() body: ScoreRequest): Promise<void> {
    try {
      await this.scoreService.createScore(body);
    } catch (err) {
      throw new UserNotFoundError(err);
    }
  }
}
