import Phaser from 'phaser';
import { Stage } from "../scene/ten-game.scene.stage";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
  },
  input: {
    mouse: true,
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#ffffff',
  scene: [
    Stage,
  ],
};
