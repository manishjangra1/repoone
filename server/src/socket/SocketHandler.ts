import { Server, Socket } from 'socket.io';
import { GameLoop } from '../game-engine/GameLoop';
import { ClientToServerEvents, ServerToClientEvents } from '@chaos/shared';

export class SocketHandler {
  private io: Server;
  private gameLoop: GameLoop;

  constructor(io: Server, gameLoop: GameLoop) {
    this.io = io;
    this.gameLoop = gameLoop;
    this.setupListeners();
  }

  private setupListeners() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Player connected: ${socket.id}`);

      socket.on(ClientToServerEvents.JOIN_GAME, () => {
        this.gameLoop.addPlayer(socket.id);
        this.io.emit(ServerToClientEvents.PLAYER_JOINED, socket.id);
      });

      socket.on(ClientToServerEvents.INPUT, (input: any) => {
        this.gameLoop.handleInput(socket.id, input);
      });

      socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        this.gameLoop.removePlayer(socket.id);
        this.io.emit(ServerToClientEvents.PLAYER_LEFT, socket.id);
      });
    });
  }
}
