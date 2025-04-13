import { Scene, GameObjects, Types } from 'phaser';
import { SocketManager } from '../network/SocketManager';
import { PlayerState } from '@chaos/shared';

export default class MainScene extends Scene {
  private socketManager!: SocketManager;
  private players: Map<string, GameObjects.Rectangle> = new Map();
  private cursors!: Types.Input.Keyboard.CursorKeys;
  private stateUpdateHandler!: (gameState: any) => void;

  constructor() {
    super('MainScene');
  }

  init() {
    this.socketManager = SocketManager.getInstance();
  }

  preload() {
  }

  create() {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
    this.socketManager.joinGame();

    this.stateUpdateHandler = (gameState) => {
      this.updatePlayers(gameState.players);
    };

    this.socketManager.onStateUpdate(this.stateUpdateHandler);

    this.events.on('shutdown', () => {
      this.socketManager.offStateUpdate(this.stateUpdateHandler);
    });
  }

  update() {
    if (!this.cursors) return;

    const input = {
      left: this.cursors.left?.isDown || false,
      right: this.cursors.right?.isDown || false,
      up: this.cursors.up?.isDown || false,
      down: this.cursors.down?.isDown || false,
      jump: this.cursors.space?.isDown || false,
      attack: false,
      dash: false,
    };

    this.socketManager.sendInput(input);
  }

  private updatePlayers(playersState: Record<string, PlayerState>) {
    try {
      if (!this.sys || !this.sys.isActive()) return;
      
      const localId = this.socketManager.getSocketId();

      Object.entries(playersState).forEach(([id, state]) => {
        let player = this.players.get(id);
        
        if (!player) {
          const color = id === localId ? 0x00ff00 : 0xff0000;
          player = this.add.rectangle(state.x, state.y, 40, 40, color);
          this.players.set(id, player);
        } else {
          player.setPosition(state.x, state.y);
          
          if (id === localId && player.fillColor === 0xff0000) {
            player.setFillStyle(0x00ff00);
          }
        }
      });

      this.players.forEach((_, id) => {
        if (!playersState[id]) {
          this.players.get(id)?.destroy();
          this.players.delete(id);
        }
      });
    } catch (error) {
      console.warn('MainScene: Error updating players', error);
    }
  }
}
