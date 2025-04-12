export interface PlayerInput {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  attack: boolean;
  dash: boolean;
}

export interface PlayerState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 'left' | 'right';
  anim: string;
  health: number;
  score: number;
  isDead: boolean;
}

export interface GameState {
  players: Record<string, PlayerState>;
  timestamp: number;
}

export enum ServerToClientEvents {
  STATE_UPDATE = 'stateUpdate',
  PLAYER_JOINED = 'playerJoined',
  PLAYER_LEFT = 'playerLeft',
  GAME_START = 'gameStart',
}

export enum ClientToServerEvents {
  INPUT = 'input',
  JOIN_GAME = 'joinGame',
}
