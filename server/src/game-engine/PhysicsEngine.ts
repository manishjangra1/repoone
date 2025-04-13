import 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, GRAVITY } from '@chaos/shared';

export class PhysicsEngine {
  private game: Phaser.Game;
  public scene: Phaser.Scene;

  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.HEADLESS,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: GRAVITY },
          debug: false
        }
      },
      callbacks: {
        postBoot: (game) => {
          this.game = game;
        }
      }
    };

    this.game = new Phaser.Game(config);
    this.scene = new Phaser.Scene({});
    this.game.scene.add('main', this.scene, true);
  }

  public update(time: number, delta: number) {
    // Phaser handles physics updates internally if the scene is running
    // but we can add manual update logic here if needed
  }
}
