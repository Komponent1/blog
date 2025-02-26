import { Scene } from "phaser";
import { StageInfo } from "../object/ten-bricks.object.stageInfo";
import {
  createUser, getHashKey, saveHashKey, saveScore,
} from '../../common/game.common.score';
import { UserResponse } from '../../common/dto/game.common.dto';

export class Result extends Scene {
  constructor() {
    super("Result");
  }

  public stageInfo!: StageInfo;
  public startButton!: Phaser.GameObjects.Container;

  init(data: any) {
    if (data.stageInfo) {
      this.stageInfo = data.stageInfo;
    } else {
      this.stageInfo = StageInfo.init();
    }
  }

  create() {
    const back = this.add.rectangle(0, 0, 800, 600, 0xffffff, 0.5).setOrigin(0.5, 0.5);
    const score = this.add.text(0, -150, `GAME SCORE`, {
      fontSize: "72px", fontFamily: "noto", color: "#fff",
    }).setStroke("#000", 10).setOrigin(0.5, 0.5);
    const ScoreText = this.add.text(0, -20, `${this.stageInfo.score}`, {
      fontSize: "128px", fontFamily: "noto", color: "#fff",
    }).setStroke("#000", 15).setOrigin(0.5, 0.5);
    const button = this.add.rectangle(0, 0, 200, 100, 0x000000)
      .setStrokeStyle(5, 0xff0000)
      .setOrigin(0.5, 0.5);
    const text = this.add.text(0, 0, "RESTART", {
      fontSize: "32px",
      color: "#000",
      fontFamily: "noto",
    }).setOrigin(0.5, 0.5).setStroke("#fff", 5);
    this.startButton = this.add.container(0, 150, [button, text]);
    button.setInteractive();

    button.on("pointerdown", () => {
      this.scene.stop("Stage");
      this.scene.start("Main");
    });

    this.add.container(1920 / 2, 1080 / 2, [back, score, ScoreText, this.startButton]);

    const key = getHashKey();
    if (key) {
      saveScore({
        uid: key as string,
        gid: "ten-bricks",
        score: this.stageInfo.score,
      });
    } else {
      createUser("unknown").then((res: UserResponse) => {
        saveHashKey(res.uid);
        saveScore({
          uid: res.uid,
          gid: "ten-bricks",
          score: this.stageInfo.score,
        });
      });
    }
  }
}
