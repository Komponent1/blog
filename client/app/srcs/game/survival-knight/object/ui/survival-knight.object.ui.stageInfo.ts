import { SCREEN_WIDTH } from "../../constant/survival-knight.constant.config";
import { CLEAR_TIME } from "../../constant/survival-knight.constant.stage";
import { StageState } from "../../scenes/survival-knight.scene.enum";
import type { Stage } from "../../scenes/survival-knight.scene.stage";

type GenTime = {
  goblin_torch: number;
  fire: number;
  boss: number;
};
export class StageInfo {
  protected _genTime: GenTime;
  protected _stageStartTime: number;
  protected _stageLevel: number;
  protected _stageState: StageState;

  public leftTimeText!: Phaser.GameObjects.Text;
  public stageLevelText!: Phaser.GameObjects.Text;

  constructor() {
    this._stageLevel = 1;
    this._stageStartTime = Date.now();
    this._stageState = StageState.LOADING;
    this._genTime = { goblin_torch: 0, fire: 0, boss: 0 };
  }
  get genTime() { return this._genTime; }
  get stageStartTime() { return this._stageStartTime; }
  get stageLevel() { return this._stageLevel; }
  get stageState() { return this._stageState; }
  public setGenTime(key: keyof GenTime, genTime: number) {
    this._genTime[key] = genTime;
  }
  public setStageStartTime(stageStartTime: number) {
    this._stageStartTime = stageStartTime;
  }
  public setStageState(stageState: StageState) {
    this._stageState = stageState;
  }
  public setStageLevel(stageLevel: number) {
    this._stageLevel = stageLevel;
  }

  public updateTime() {
    if (this._stageLevel === 4) {
      this.leftTimeText.setText('Infinity');
    }
    this.leftTimeText.setText(
      String(Math.floor((CLEAR_TIME + this.stageStartTime - Date.now()) / 1000)),
    );
  }
  public nextLevel() {
    this._stageLevel += 1;
    this.stageLevelText.setText(String(this.stageLevel));
  }
  public checkClear(): boolean {
    if (this.stageLevel === 4) return false;
    if (Date.now() - this.stageStartTime > CLEAR_TIME) {
      this._stageState = StageState.CLEAR;
      return true;
    }
    return false;
  }
  public clear() {
    this._stageLevel = 1;
    this._stageStartTime = Date.now();
    this._genTime = { goblin_torch: 0, fire: 0, boss: 0 };
  }
  static init() {
    const stageInfo = new StageInfo();
    return stageInfo;
  }
  create(scene: Stage) {
    this.leftTimeText = scene.add.text(
      SCREEN_WIDTH / 2,
      60,
      `${Math.floor((CLEAR_TIME + this.stageStartTime - Date.now()) / 1000)}`,
      { fontSize: '32px', color: '#fff', fontStyle: 'bold' },
    ).setOrigin(0.5);
    this.stageLevelText = scene.add.text(
      SCREEN_WIDTH / 2,
      20,
      `STAGE ${this.stageLevel}`,
      { fontSize: '48px', color: '#fff', fontStyle: 'bold' },
    ).setOrigin(0.5);
    scene.uiLayer.add(this.leftTimeText);
    scene.uiLayer.add(this.stageLevelText);
  }
}
