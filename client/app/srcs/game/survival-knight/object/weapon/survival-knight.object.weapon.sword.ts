import { Vector } from "../../../common/utils/vector";
import { SWORD } from "../../constant/survival-knight.constant.object";
import type { Stage } from "../../scenes/survival-knight.scene.stage";

export class Sword {
  protected _damage: number;
  protected _range: number;
  protected _area!: MatterJS.BodyType | null;
  protected _graphics!: Phaser.GameObjects.Graphics;
  protected _object!: Phaser.GameObjects.GameObject;

  private _dir: Vector = new Vector(0, 0);
  private _offset: {x: number; y: number} = {x: 0, y: 0};

  constructor(damage: number, range: number) {
    this._damage = damage;
    this._range = range;
  }
  static init() {
    return new Sword(SWORD.ATTACK, SWORD.RANGE);
  }
  create(scene: Stage, x: number, y: number, dir: Vector) {
    if (dir) {
      this._dir = dir;
      let startAngle = 0;
      let endAngle = 0;
      if (this._dir.x === 0) {
        if (this._dir.y > 0) {
          startAngle = Math.PI * (1 / 4);
          endAngle = Math.PI * (3 / 4);
        } else {
          startAngle = Math.PI * (5 / 4);
          endAngle = Math.PI * (7 / 4);
        }
      } else if (this._dir.x > 0) {
        startAngle = -Math.PI * (1 / 4);
        endAngle = Math.PI * (1 / 4);
      } else {
        startAngle = Math.PI * (3 / 4);
        endAngle = Math.PI * (5 / 4);
      }
      const points = Sword.createFanShapePoints(this._range, startAngle, endAngle, 4);
      this._area = scene.matter.add.fromVertices(
        -1000,
        -1000,
        points,
        {
          isSensor: true,
        },
        true,
      );
      this._offset = {x: this._area.centerOffset.x, y: this._area.centerOffset.y};
      if (this._dir.x === 0) {
        if (this._dir.y > 0) {
          this._offset = {x: 0, y: this._offset.y};
        } else {
          this._offset = {x: 0, y: -(this._range - this._offset.y)};
        }
      } else if (this._dir.x > 0) {
        this._offset = {x: this._offset.x, y: 0};
      } else {
        this._offset = {x: -(this._range - this._offset.x), y: 0};
      }

      this._graphics = scene.add.graphics();
      this._graphics.fillStyle(0xff0000, 0.5);
      this._graphics.beginPath();
      this._graphics.moveTo(points[0].x - this._offset.x, points[0].y - this._offset.y);
      for (let i = 1; i < points.length; i += 1) {
        this._graphics.lineTo(points[i].x - this._offset.x, points[i].y - this._offset.y);
      }
      this._graphics.closePath();
      this._graphics.fillPath();
      scene.mapLayer.add(this._graphics);
      this._object = scene.matter.add.gameObject(this._graphics, this._area);

      scene.pool.monsters.goblin_torch.forEach((monster) => {
        scene.matter.world.on('collisionstart', (event: any) => {
          event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            const { bodyA, bodyB } = pair;
            if ((bodyA === this._area && bodyB === monster.physics.body)
                || (bodyB === this._area && bodyA === monster.physics.body)) {
              monster.swordAttacked(scene, scene.player);
            }
          });
        });
      });
      scene.pool.monsters.fire.forEach((monster) => {
        scene.matter.world.on('collisionstart', (event: any) => {
          event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            const { bodyA, bodyB } = pair;
            if ((bodyA === this._area && bodyB === monster.physics.body)
                || (bodyB === this._area && bodyA === monster.physics.body)) {
              monster.swordAttacked(scene, scene.player);
            }
          });
        });
      });
      scene.pool.monsters.boss.forEach((monster) => {
        scene.matter.world.on('collisionstart', (event: any) => {
          event.pairs.forEach((pair: Phaser.Types.Physics.Matter.MatterCollisionPair) => {
            const { bodyA, bodyB } = pair;
            if ((bodyA === this._area && bodyB === monster.physics.body)
                || (bodyB === this._area && bodyA === monster.physics.body)) {
              monster.swordAttacked(scene, scene.player);
            }
          });
        });
      });
    }
  }

  public get position() {
    if (!this._area) return undefined;
    return { x: this._area.position.x, y: this._area.position.y };
  }
  public get area() { return this._area; }
  public get damage() { return this._damage; }
  public get range() { return this._range; }

  public attack(scene: Stage, dir: Vector) {
    scene.sound.play('swing');
    this.create(scene, scene.player.position.x, scene.player.position.y, dir);
  }
  public release(scene: Stage) {
    if (!this._area) return;
    this._graphics?.destroy();
    scene.matter.world.remove(this._area);
    this._area = null;
  }
  public setRange(range: number) {
    this._range = range;
  }
  public setDamage(damage: number) {
    this._damage = damage;
  }
  public setPosition(scene: Stage, x: number, y: number) {
    if (!this._area) return;
    scene.matter.body.setPosition(this._area, { x: x + this._offset.x, y: y + this._offset.y });
  }

  static createFanShapePoints(
    radius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
  ) {
    const points = [];
    const angleStep = (endAngle - startAngle) / segments;

    for (let i = 0; i <= segments; i += 1) {
      const angle = startAngle + i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      points.push({ x, y });
    }

    points.push({ x: 0, y: 0 }); // 중심점 추가

    return points;
  }
}
