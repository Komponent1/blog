/* eslint-disable no-param-reassign */
import Phaser from 'phaser';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import { RefPhaserGame } from './dto/survival-knight.dto.ref';
import {gameConfig} from './config/survival-knight.config';

const SurvivalKnightContainer = forwardRef<RefPhaserGame, {}>((_, ref) => {
  const game = useRef<Phaser.Game | null>(null);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = new Phaser.Game(gameConfig);
    }

    return () => {
      game.current?.destroy(true);
      if (game.current !== null) {
        game.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof ref === 'function') {
      ref({ game: game.current, scene: null });
    } else if (ref) {
      ref.current = { game: game.current, scene: null };
    }
  }, [ref]);

  return (
    <div id="game-container" />
  );
});

SurvivalKnightContainer.displayName = 'Game';

export default SurvivalKnightContainer;
