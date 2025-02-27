import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserResponse {
  @IsString() @IsNotEmpty() uid: string;
  @IsString() @IsNotEmpty() nickname: string;
}
export class UserScoreResponse {
  @IsString() @IsNotEmpty() uid: string;
  @IsString() @IsNotEmpty() nickname: string;
  @IsString() @IsNotEmpty() gid: string;
  @IsString() @IsNotEmpty() game_name: string;
  @IsString() @IsNotEmpty() score: number;
}

export class ScoreRequest {
  @IsString() @IsNotEmpty() uid: string;
  @IsString() @IsNotEmpty() gid: string;
  @IsNumber() @IsNotEmpty() score: number;
}
export class UserRequest {
  @IsString() @IsNotEmpty() nickname: string;
  @IsString() @IsNotEmpty() pw: string;
}
