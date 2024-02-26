import { WebSocketServer } from 'ws';
import { Socket } from '../types/types';
import regPlayer from '../handlers/regPlayer';
import createRoom from '../handlers/createRoom';
import updateRoom from '../handlers/updateRoom';
import addUserToRoom from '../handlers/addUserToRoom';
import createGame from '../handlers/createGame';
import startGame from '../handlers/startGame';
import attack from '../handlers/attack';
import addShips from '../handlers/addShips';
import updateWinners from '../handlers/updateWinners';
import { connections, games, roomUsers, users, winners } from './database';

const port: number = 3000;

const start = () => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (socket: Socket) => {
    console.log('Player connected');

    socket.on('message', (message: string) => {
      const data = JSON.parse(message);

      if (data.type === 'reg') {
        regPlayer(socket, data);
        updateRoom();
        updateWinners();
      }

      if (data.type === 'create_room') {
        createRoom(socket);
        updateRoom();
      }

      if (data.type === 'add_user_to_room') {
        addUserToRoom(socket, data);
        updateRoom();
      }

      if (data.type === 'add_ships') {
        addShips(socket, data);
        startGame(socket, data);
      }

      if (data.type === 'start_game') {
        startGame(socket, data);
      }

      if (data.type === 'atack') {
        attack(socket, data);
      }
    });

    socket.on('close', () => {
      console.log('Player disconnected');
    });
  });
  console.log(`\x1b[33mStart websocket server on the ${port} port! \x1b[0m`);
};

start();
