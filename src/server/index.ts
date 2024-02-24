import { WebSocketServer } from 'ws';
import { Socket } from '../types/types';
import regPlayer from '../handlers/regPlayer';
import createRoom from '../handlers/createRoom';
import updateRoom from '../handlers/updateRoom';
import addUserToRoom from '../handlers/addUserToRoom';
import createGame from '../handlers/createGame';

const port: number = 3000;

const start = () => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (socket: Socket) => {
    console.log('Player connected');

    socket.on('message', (message: string) => {
      const data = JSON.parse(message);
      console.log('Received:', data);

      if (data.type === 'reg') {
        regPlayer(socket, data);
        updateRoom();
      }

      if (data.type === 'create_room') {
        createRoom(socket);
        updateRoom();
      }

      if (data.type === 'add_user_to_room') {
        addUserToRoom(socket, data);
        createGame();
        updateRoom();
      }
    });

    socket.on('close', () => {
      console.log('Player disconnected');
    });
  });
};

start();
