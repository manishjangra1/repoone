'use client';

import React, { useEffect, useRef } from 'react';
import { Game, Types, AUTO } from 'phaser';
import MainScene from './scenes/MainScene';
import { GAME_WIDTH, GAME_HEIGHT } from '@chaos/shared';

const PhaserGame: React.FC = () => {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !gameRef.current) {
      const config: Types.Core.GameConfig = {
        type: AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        parent: 'game-container',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: true
          }
        },
        scene: [MainScene]
      };

      gameRef.current = new Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="game-container" className="w-full h-full flex items-center justify-center bg-black" />;
};

export default PhaserGame;
