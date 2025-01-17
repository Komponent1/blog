import {CharactorStatus} from './game.object.enum';

export class Charactor {
  protected _status: CharactorStatus = CharactorStatus.ALIVE;
  public attackedTime = 0;

  constructor(
    protected _sprite: Phaser.GameObjects.Sprite,
    protected _name: string,
    protected _hp: number,
    protected _attack: number,
  ) {}

  public get attack() { return this._attack; }
  public get hp() { return this._hp; }
  public get sprite() { return this._sprite; }
  public get name() { return this._name; }
  public get status() { return this._status; }
  public get position() {
    return {x: this._sprite.x, y: this._sprite.y};
  }

  public setHp(hp: number) {
    this._hp = hp;
  }

  public attackTo(target: Charactor): boolean {
    if (target.status === CharactorStatus.DEAD) return false;
    if (
      target.attackedTime !== 0
      && Date.now() - target.attackedTime < 1000
    ) return false;

    target.changeAttackedTime(Date.now());
    target.decreaseHp(this.attack);
    return true;
  }

  public decreaseHp(damage: number) {
    this._hp -= damage;
    if (this._hp <= 0) {
      this._status = CharactorStatus.DEAD;
    }
  }
  public changeAttackedTime(time: number) {
    this.attackedTime = time;
  }
}
