import { connections, users } from '../server/database';
import { Socket, AuthData } from '../types/types';
import sendResponse from '../utils/sendResponse';

const regPlayer = (socket: Socket, data: AuthData) => {
  try {
    const { name, password } = JSON.parse(data.data);

    if (name && password) {
      const existingUser = users.find((user) => user.name === name);

      if (existingUser) {
        if (existingUser.password === password) {
          socket.index = existingUser.index;
          connections.push(socket);

          const responseData = {
            name: existingUser.name,
            index: socket.index,
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
        socket.index = id;

        const newUser = {
          name,
          password,
          index: socket.index,
          wins: 0,
        };

        users.push(newUser);
        connections.push(socket);

        const responseData = {
          name,
          index: socket.index,
          error: false,
          errorText: '',
        };
        console.log('User registered');
        sendResponse(responseData, socket);
      }
    }
  } catch {
    console.log('Something went wromg.˝');
  }
};

export default regPlayer;
