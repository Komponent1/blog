import {CharacterStatus} from './survival-knight.object.enum';
import {Hpbar} from './base/survival-knight.object.hpbar';
import { Vector } from "../../common/utils/vector";
import type {Stage} from '../scenes/survival-knight.scene.stage';

export class Character {
  protected _status: CharacterStatus = CharacterStatus.IDLE;
  protected _hp: Hpbar;
  protected _attack: number;
  protected _name: string;
  protected _dir: Vector = new Vector(1, 0);
  protected _speed: number = 0;

  protected _sprite!: Phaser.GameObjects.Sprite;
  protected _container!: Phaser.GameObjects.Container;

  public attackedTime = 0;

  constructor(
    name: string,
    hp: Hpbar,
    attack: number,
    speed: number,
  ) {
    this._hp = hp;
    this._attack = attack;
    this._name = name;
    this._speed = speed;
  }

  public get attack() { return this._attack; }
  public get hp() { return this._hp; }
  public get sprite() { return this._sprite; }
  public get name() { return this._name; }
  public get status() { return this._status; }
  public get position() {
    return {x: this._container.x, y: this._container.y};
  }

  public setHp(hp: number) {
    this._hp.setHp(hp);
  }
  public setDir(x: number, y: number) {
    this._dir = new Vector(x, y).normalize();
  }
  public setSpeed(speed: number) {
    this._speed = speed;
  }

  public attackTo(scene: Stage, target: Character): boolean {
    if (this.status === CharacterStatus.DEAD || this.status === CharacterStatus.WAIT) return false;
    if (target.status === CharacterStatus.DEAD) return false;
    if (
      target.attackedTime !== 0
      && Date.now() - target.attackedTime < 1000
    ) return false;

    target.sprite.setTint(0xff0000);
    setTimeout(() => {
      target.sprite.setTint(0xffffff);
    }, 100);
    target.changeAttackedTime(Date.now());
    target.decreaseHp(scene, this.attack);
    return true;
  }

  public decreaseHp(scene: Stage, damage: number) {
    scene.sound.play("damaged");
    this._hp.decreaseHp(damage);
  }
  public changeAttackedTime(time: number) {
    this.attackedTime = time;
  }
}
