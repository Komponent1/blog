/** 사과 크기 */
export const BASE_W = 64;
export const BASE_H = 64;
export const BRICK_W = 48;
export const BRICK_H = 48;
export const BRICK_FONT_SIZE = 32;
export const BRICK_FONT_STROKE = 4;
/** 사과 사이 마진 */
export const MARGIN = 16;
/** 게임 보드 가로 세로 개수 */
export const ROW = 10 * 2;
export const COL = 17;
/** 게임 플레이 시간 120초 */
export const GAME_TIME = 12 * 1000;
/** 스테이지 상태 */
export enum StageState {
  Playing = "Playing",
  GameOver = "GameOver",
}
/** 블록의 타입(apple = 일반 블록, boom = 폭탄, empty = 빈공간) */
export enum BlockType {
  Apple = "apple",
  Bomb = "bomb",
  Empty = "empty",
}
/** 폭탄 변환 주기 */
export const BOMB_GEN_TIME = 5000;
/** 사과 젠 주기 */
export const APPLE_GEN_TIME = 5000;
/** 사과 젠 시작 비율 */
export const APPLE_GEN_RATE = 0.7;
/** 시작 폭탄 개수 */
export const BOMB_COUNT = 5;
/** 블록 움직이는 속도 */
export const MOVE_SPEED = 20;
/** 게임 윈도우 크기 및 코너 마진 */
export const WINDOW_W = BASE_W * COL + MARGIN * (COL + 1);
export const WINDOW_H = BASE_H * (ROW / 2) + MARGIN * ((ROW / 2) + 1);
export const WINDOW_POS_X = 100;
export const WINDOW_POS_Y = 30;
export const WINDOW_RADIUS = 10;
export const WINDOW_STROKE = 20;
/** 블록 붕괴 타입 */
export enum BlockDestroyType {
  Drag = "drag",
  Bomb = "bomb",
  Change = "change",
}
/** 폭탄 이동 위치 */
export const BOMBS_MOVE_POS = {
  x: 1920 - 250,
  y: 450,
};
export const BOMBS_DURATION = 300;
