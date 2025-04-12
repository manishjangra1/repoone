import { Server } from 'socket.io';
import { TICK_INTERVAL, ServerToClientEvents, GameState } from '@chaos/shared';

export class GameLoop {
  private io: Server;
  private interval: NodeJS.Timeout | null = null;
  private lastTime: number = 0;
  private players: Map<string, any> = new Map(); // Simple for now

  constructor(io: Server) {
    this.io = io;
  }

  public start() {
    this.lastTime = Date.now();
    this.interval = setInterval(() => this.update(), TICK_INTERVAL);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private update() {
    const now = Date.now();
    const deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // TODO: Update game state (physics, collisions, etc.)
    // For now, just a placeholder broadcast
    const gameState: GameState = {
      players: this.getPlayersState(),
      timestamp: now
    };

    this.io.emit(ServerToClientEvents.STATE_UPDATE, gameState);
  }

  public addPlayer(id: string) {
    this.players.set(id, {
      id,
      x: 400,
      y: 300,
      vx: 0,
      vy: 0,
      facing: 'right',
      anim: 'idle',
      health: 100,
      score: 0,
      isDead: false
    });
  }

  public removePlayer(id: string) {
    this.players.delete(id);
  }

  public handleInput(id: string, input: any) {
    const player = this.players.get(id);
    if (player) {
      // Very basic movement for now (not authoritative yet, just testing)
      if (input.left) player.x -= 5;
      if (input.right) player.x += 5;
      if (input.up) player.y -= 5;
      if (input.down) player.y += 5;
    }
  }

  private getPlayersState() {
    const state: Record<string, any> = {};
    this.players.forEach((player, id) => {
      state[id] = player;
    });
    return state;
  }
}
