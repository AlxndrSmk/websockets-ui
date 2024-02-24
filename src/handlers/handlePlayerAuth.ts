import { connections, users } from '../server/database';
import { Socket, AuthData } from '../types/types';
import sendResponse from '../utils/sendResponse';

const handlePlayerAuth = (socket: Socket, data: AuthData) => {
  const { name, password } = JSON.parse(data.data);

  if (name && password) {
    const existingUser = users.find((user) => user.name === name);

    if (existingUser) {
      if (existingUser.password === password) {
        socket.id = existingUser.id;
        connections.push(socket);

        const responseData = {
          name: existingUser.name,
          index: socket.id,
          error: false,
          errorText: '',
        };
        console.log('User logged in');

        sendResponse(responseData, socket);
      } else {
        const responseData = {
          error: true,
          errorText: 'Incorrect password',
        };
        console.log('Incorrect password');
        sendResponse(responseData, socket);
      }
    } else {
      const id =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      socket.id = id;

      const newUser = {
        name,
        password,
        id: socket.id,
        wins: 0,
      };

      users.push(newUser);
      connections.push(socket);

      const responseData = {
        name,
        index: socket.id,
        error: false,
        errorText: '',
      };
      console.log('User registered');
      sendResponse(responseData, socket);
    }

    console.log('USERS: ', users);
  }
};

export default handlePlayerAuth;
