import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, GameState } from '@chaos/shared';

export class SocketManager {
  private socket: Socket;
  private static instance: SocketManager;

  private constructor() {
    this.socket = io('http://localhost:5001');
    this.setupListeners();
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  private setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  public joinGame() {
    this.socket.emit(ClientToServerEvents.JOIN_GAME);
  }

  public sendInput(input: any) {
    this.socket.emit(ClientToServerEvents.INPUT, input);
  }

  public onStateUpdate(callback: (state: GameState) => void) {
    this.socket.on(ServerToClientEvents.STATE_UPDATE, callback);
  }

  public offStateUpdate(callback: (state: GameState) => void) {
    this.socket.off(ServerToClientEvents.STATE_UPDATE, callback);
  }

  public getSocketId(): string {
    return this.socket.id || '';
  }
}
