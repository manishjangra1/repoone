import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameLoop } from './game-engine/GameLoop';
import { SocketHandler } from './socket/SocketHandler';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // For development
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5001;

const gameLoop = new GameLoop(io);
const socketHandler = new SocketHandler(io, gameLoop);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  gameLoop.start();
});
