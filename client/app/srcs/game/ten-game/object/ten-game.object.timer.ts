import { GAME_TIME } from "../constant/ten-game.constant.stage";
import type { Stage } from "../scene/ten-game.scene.stage";

export class Timer {
  public timerBackground: Phaser.GameObjects.Graphics | null = null;
  public timerLeft: Phaser.GameObjects.Graphics | null = null;
  public timerText: Phaser.GameObjects.Text | null = null;

  public leftTime: number = GAME_TIME;

  static init() {

  }

  create(scene: Stage) {
    this.timerBackground = scene.add.graphics();
    this.timerBackground.fillStyle(0x000000, 0.5);
    this.timerBackground.fillRect(0, 0, 100, 50);

    this.timerLeft = scene.add.graphics();
    this.timerLeft.fillStyle(0xff0000, 1);
    this.timerLeft.fillRect(0, 0, 100, 50);

    this.timerText = scene.add.text(0, 0, `${this.leftTime}`, {
      fontSize: '32px',
      color: '#ffffff',
    });
  }
}
