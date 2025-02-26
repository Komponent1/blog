import { MAP_H, MAP_W } from "../constant/survival-knight.constant.config";
import {} from '../constant/survival-knight.constant.monster';
import type {Stage} from '../scenes/survival-knight.scene.stage';
import {Vector} from '../../common/utils/vector';
import type {Character} from './survival-knight.object.character';
import {BulletStatus} from './survival-knight.object.enum';

export class Bullet {
  protected _status: BulletStatus = BulletStatus.LOADED;
  protected _dir: Vector = new Vector(0, 0);
  protected _image!: Phaser.GameObjects.Image;
  protected _physics!: Phaser.GameObjects.GameObject;
  protected _speed: number = 0;

  constructor(
    speed: number,
  ) {
    this._speed = speed;
  }
  get physics() { return this._physics; }
  static init(speed: number) {
    return new Bullet(speed);
  }
  create(scene: Stage) {
    this._image = scene.add.image(0, 0, 'bullet');
    this._physics = scene.matter.add.gameObject(this._image, {
      shape: {
        type: 'circle',
        radius: 15,
      },
      isSensor: true,
    });
    scene.mapLayer.add(this._image);
    scene.matter.world.on('collisionstart', (event: any) => {
      event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
        const { bodyA, bodyB } = pair;
        if ((bodyA === scene.player.physics.body && bodyB === this._image.body)
            || (bodyB === scene.player.physics.body && bodyA === this._image.body)) {
          this.attackTo(scene, scene.player);
        }
      });
    });
  }

  public get bullet() { return this._image; }
  public get position() {
    return {x: this._image.x, y: this._image.y};
  }
  public get status() { return this._status; }

  move() {
    if (this._status === BulletStatus.LOADED) return;
    this._image.x += this._dir.x * this._speed;
    this._image.y += this._dir.y * this._speed;
  }

  attackTo(scene: Stage, target: Character) {
    target.sprite.setTint(0xff0000);
    setTimeout(() => {
      target.sprite.setTint(0xffffff);
    }, 100);
    target.decreaseHp(scene, 10);
    this.clear();
  }

  shoot(x: number, y: number, dir: Vector) {
    this._image.x = x;
    this._image.y = y;
    this._dir = dir;
    this._status = BulletStatus.SHOOTED;
  }

  checkOutOfScreen() {
    if (
      this._image.x < 0
      || this._image.x > MAP_W
      || this._image.y < 0
      || this._image.y > MAP_H
    ) {
      this.clear();
    }
  }

  clear() {
    this._image.x = -200;
    this._image.y = -100;
    this._dir = new Vector(0, 0);
    this._status = BulletStatus.LOADED;
  }

  destroy() {
    this._image.destroy();
    this._physics.destroy();
  }
}
