import { Scene } from "phaser";

export const debugLine = (
  scene: Scene,
  obj: {x: number; y: number; width: number, height: number},
) => scene.add.rectangle(
  obj.x,
  obj.y,
  obj.height,
  obj.width,
  0x00ff00,
  0.5,
).setDepth(-2);
