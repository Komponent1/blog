import {Charactor} from '../game.object.charator';
import type {Stage} from '../../scenes/game.scene.stage';
import {Vector} from '../../../utils/vector';
import {CharactorStatus} from '../game.object.enum';
import { MonsterHpbar } from "./game.object.monsterHpbar";
import {Player} from '../game.object.player';

export class Monster extends Charactor {
  protected _hp: MonsterHpbar;
  protected _exp: number;
  protected _w: number;
  protected _h: number;

  constructor(
    name: string,
    hp: MonsterHpbar,
    attack: number,
    speed: number,
    exp: number,
    w: number,
    h: number,
  ) {
    super(name, hp, attack, speed);
    this._hp = hp;
    this._exp = exp;
    this._status = CharactorStatus.WAIT;
    this._w = w;
    this._h = h;
  }
  create(scene: Stage, x: number, y: number, sprite: string) {
    this._sprite = scene.physics.add.sprite(x, y, `${sprite}`).play(`${sprite}_walk`);
    this._sprite.body.setSize(80, 100).setOffset(50, 50);
    this._hp.create(scene, x - this._w / 2, y - this._h / 2);

    scene.mapLayer.add(this._sprite);
    scene.physics.add.overlap(scene.player.sprite, this._sprite, () => {
      scene.player.bodyAttack(this);
      this.attackTo(scene.player);
    });
    scene.physics.add.overlap(scene.player.weapon.sprite, this._sprite, () => {
      this.swordAttacked(scene.player);
    });
  }
  update(scene: Stage) {
    if (this.status === CharactorStatus.DEAD
      || this.status === CharactorStatus.WAIT) return;
    const dir = new Vector(
      scene.player.position.x - this.position.x,
      scene.player.position.y - this.position.y,
    ).normalize();
    this.move(dir);
    this.checkHp(scene);
  }

  move(dir: Vector, speed: number = this._speed) {
    this._sprite.x += dir.x * speed;
    this._sprite.y += dir.y * speed;
    this._hp.move(this._sprite.x, this._sprite.y - this._h / 2 - 5);
  }

  checkHp(scene: Stage) {
    if (this.hp.hp <= 0) {
      this.killed(scene);
    }
  }

  attackTo(target: Charactor): boolean {
    if (!super.attackTo(target)) {
      return false;
    }
    return true;
  }
  swordAttacked(player: Player) {
    if (this.attackedTime !== 0 && Date.now() - this.attackedTime < 500) return false;
    this.changeAttackedTime(Date.now());
    this.sprite.setTint(0xff0000);
    setTimeout(() => {
      this.sprite.setTint(0xffffff);
    }, 100);
    this._hp.decreaseHp(player.weapon.damage);
    const dir = new Vector(
      this.position.x - player.position.x,
      this.position.y - player.position.y,
    ).normalize();
    this.move(dir, 15);
    return true;
  }

  spawn(x: number, y: number, scene: Stage) {
    const spawnCircle = scene.add.circle(x, y, 40, 0x00ff00, 0.5);
    scene.mapLayer.add(spawnCircle);

    setTimeout(() => {
      if (!this._sprite) return;
      this._status = CharactorStatus.IDLE;
      this._sprite.play(`${this.name}_walk`);
      this._sprite.x = x;
      this._sprite.y = y;
      spawnCircle.destroy();
    }, 1000);
  }
  dead() {
    if (this._status === CharactorStatus.DEAD) return;
    this._status = CharactorStatus.DEAD;
    this._sprite.play(`${this._name}_die`).once(`animationcomplete-${this.name}_die`, () => {
      this._status = CharactorStatus.WAIT;
      this._sprite.stop();
      this._sprite.x = -400;
      this._sprite.y = -400;
      this._hp.move(this._sprite.x - this._w / 2, this._sprite.y - this._h / 2);
      this._hp.setHp(this._hp.maxHp);
    });
  }
  killed(scene: Stage) {
    scene.player.addExp(this._exp);
    this.dead();
  }
}
