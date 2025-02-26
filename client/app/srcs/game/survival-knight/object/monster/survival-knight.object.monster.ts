import {Character} from '../survival-knight.object.character';
import type {Stage} from '../../scenes/survival-knight.scene.stage';
import {Vector} from '../../../common/utils/vector';
import {CharacterStatus} from '../survival-knight.object.enum';
import { MonsterHpbar } from "./survival-knight.object.monsterHpbar";
import {Player} from '../survival-knight.object.player';

export class Monster extends Character {
  protected _hp: MonsterHpbar;
  protected _exp: number;
  protected _w: number;
  protected _h: number;
  protected _physics!: Phaser.GameObjects.GameObject;

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
    this._status = CharacterStatus.WAIT;
    this._w = w;
    this._h = h;
  }
  get physics() { return this._physics; }
  create(scene: Stage, x: number, y: number, name: string) {
    this._sprite = scene.add.sprite(0, 0, `${name}`).play(`${name}_walk`);
    this._hp.create(scene, x - this._w / 2, y - this._h / 2);
    this._container = scene.add.container(x, y, [this._sprite]).setSize(this._w, this._h);
    this._physics = scene.matter.add.gameObject(this._container, {
      isSensor: true,
    });

    scene.mapLayer.add(this._container);
    scene.matter.world.on('collisionactive', (event: any) => {
      event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
        const { bodyA, bodyB } = pair;
        if ((bodyA === this._physics.body && bodyB === scene.player.physics.body)
            || (bodyB === this._physics.body && bodyA === scene.player.physics.body)) {
          this.attackTo(scene, scene.player);
        }
      });
    });
  }
  update(scene: Stage) {
    if (this.status === CharacterStatus.DEAD
      || this.status === CharacterStatus.WAIT) return;
    const dir = new Vector(
      scene.player.position.x - this.position.x,
      scene.player.position.y - this.position.y,
    ).normalize();
    this.move(dir);
    this.checkHp(scene);
  }

  move(dir: Vector, speed: number = this._speed) {
    this._container.x += dir.x * speed;
    this._container.y += dir.y * speed;
    this._hp.move(this._container.x, this._container.y - this._h / 2 - 5);
  }

  checkHp(scene: Stage) {
    if (this.hp.hp <= 0) {
      this.killed(scene);
    }
  }

  attackTo(scene: Stage, target: Character): boolean {
    if (!super.attackTo(scene, target)) {
      return false;
    }
    return true;
  }
  swordAttacked(scene: Stage, player: Player) {
    if (this.attackedTime !== 0 && Date.now() - this.attackedTime < 500) return false;
    this.changeAttackedTime(Date.now());
    this.sprite.setTint(0xff0000);
    setTimeout(() => {
      this.sprite.setTint(0xffffff);
    }, 100);
    scene.sound.play('damaged');
    this._hp.decreaseHp(player.sword.damage);
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
      this._status = CharacterStatus.IDLE;
      this._sprite.play(`${this.name}_walk`);
      this._container.x = x;
      this._container.y = y;
      spawnCircle.destroy();
    }, 1000);
  }
  dead() {
    if (this._status === CharacterStatus.DEAD) return;
    this._status = CharacterStatus.WAIT;
    this._sprite.stop();
    this._container.x = -400;
    this._container.y = -400;
    this._hp.move(this._container.x - this._w / 2, this._container.y - this._h / 2);
    this._hp.setHp(this._hp.maxHp);
  }
  killed(scene: Stage) {
    scene.player.addExp(this._exp);
    this.dead();
  }
}
