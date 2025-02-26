import { HPbarType } from "../../constant/survival-knight.constant.hp";
import type {Stage} from '../../scenes/survival-knight.scene.stage';
import {Vector} from '../../../common/utils/vector';
import {Bullet} from '../survival-knight.object.bullet';
import {BulletStatus, CharacterStatus} from '../survival-knight.object.enum';
import {Player} from '../survival-knight.object.player';
import {Monster} from './survival-knight.object.monster';
import {MonsterHpbar} from './survival-knight.object.monsterHpbar';
import { BOSS } from "../../constant/survival-knight.constant.object";

export class Boss extends Monster {
  private _shootTime: number = 0;

  constructor() {
    super(
      'boss',
      MonsterHpbar.init(1000, HPbarType.BOSS),
      BOSS.ATTACK,
      BOSS.SPEED,
      BOSS.EXP,
      BOSS.W,
      BOSS.H,
    );
  }
  static init() {
    return new Boss();
  }
  shootAttack(target: Player, bullets: Bullet[]) {
    if (this._status === CharacterStatus.DEAD) return;
    if (this._shootTime + BOSS.SHOOT_INTERVAL > Date.now()) return;
    this._shootTime = Date.now();
    let bulletCount = -1;
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].status === BulletStatus.LOADED) {
        const dir = new Vector(
          target.position.x - this.position.x,
          target.position.y - this.position.y,
        ).normalize().rotate((bulletCount * Math.PI) / 6);
        bullets[i].shoot(this.position.x, this.position.y, dir);
        bulletCount += 1;
        if (bulletCount >= 2) {
          break;
        }
      }
    }
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'boss');
  }
  update(scene: Stage) {
    if (this._status === CharacterStatus.DEAD) return;
    super.update(scene);
    this.shootAttack(scene.player, scene.bullets);
  }
  dead() {
    super.dead();
  }
}
