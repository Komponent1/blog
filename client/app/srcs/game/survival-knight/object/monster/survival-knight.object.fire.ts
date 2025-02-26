import { HPbarType } from "../../constant/survival-knight.constant.hp";
import type {Stage} from '../../scenes/survival-knight.scene.stage';
import {Vector} from '../../../common/utils/vector';
import {Bullet} from '../survival-knight.object.bullet';
import {BulletStatus, CharacterStatus} from '../survival-knight.object.enum';
import {Player} from '../survival-knight.object.player';
import {Monster} from './survival-knight.object.monster';
import {MonsterHpbar} from './survival-knight.object.monsterHpbar';
import { FIRE } from "../../constant/survival-knight.constant.object";

export class Fire extends Monster {
  private _shootTime: number = 0;

  constructor() {
    super(
      'fire',
      MonsterHpbar.init(FIRE.HP, HPbarType.MONSTER),
      FIRE.ATTACK,
      FIRE.SPEED,
      FIRE.EXP,
      FIRE.W,
      FIRE.H,
    );
  }
  static init() {
    return new Fire();
  }
  shootAttack(target: Player, bullets: Bullet[]) {
    if (this._status === CharacterStatus.DEAD) return;
    if (this._shootTime + FIRE.SHOOT_INTERVAL > Date.now()) return;
    this._shootTime = Date.now();
    const dir = new Vector(
      target.position.x - this.position.x,
      target.position.y - this.position.y,
    ).normalize();
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].status === BulletStatus.LOADED) {
        bullets[i].shoot(this.position.x, this.position.y, dir);
        break;
      }
    }
  }

  create(scene: Stage, x: number, y: number) {
    super.create(scene, x, y, 'fire');
  }
  update(scene: Stage): void {
    super.update(scene);
    this.shootAttack(scene.player, scene.bullets);
  }
  dead() {
    super.dead();
  }
}
