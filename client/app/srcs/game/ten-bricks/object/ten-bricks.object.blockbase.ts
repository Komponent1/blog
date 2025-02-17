import {
  BASE_H, MARGIN, MOVE_SPEED, ROW,
  WINDOW_POS_Y,
} from "../constant/ten-bricks.constant.stage";

export class BlockBase {
  protected _container!: Phaser.GameObjects.Container;
  protected _pos!: {i: number; j: number};

  public value!: number;

  get container() { return this._container; }

  setPosition(x: number, y: number) {
    this._container.setPosition(x, y);
  }
  setPos(i: number, j: number) {
    this._pos = {i, j};
  }
  move() {
    if (
      // eslint-disable-next-line max-len
      this._container.y < WINDOW_POS_Y + BASE_H * (this._pos.i - ROW / 2) + MARGIN * (this._pos.i - ROW / 2 + 1)
    ) {
      this._container.y += MOVE_SPEED;
    } else {
      // eslint-disable-next-line max-len
      this._container.y = WINDOW_POS_Y + BASE_H * (this._pos.i - ROW / 2) + MARGIN * (this._pos.i - ROW / 2 + 1);
    }
  }
}
