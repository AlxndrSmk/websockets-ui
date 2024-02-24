import { WebSocketServer } from 'ws';
import handlePlayerAuth from '../handlers/handlePlayerAuth';
import { Socket } from '../types/types';

const port: number = 3000;

const start = () => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (socket: Socket) => {
    console.log('Player connected');

    socket.on('message', (message: string) => {
      const data = JSON.parse(message);
      console.log('Received:', data);

      if (data.type === 'reg') {
        handlePlayerAuth(socket, data);
      }
    });

    socket.on('close', () => {
      console.log('Player disconnected');
    });
  });
};

start();
