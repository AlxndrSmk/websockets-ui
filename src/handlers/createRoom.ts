import { roomUsers, users } from '../server/database';
import { Socket } from '../types/types';

const createRoom = (socket: Socket) => {
  const existingRoom = roomUsers.find((room) => room.roomId === socket.id);

  if (!existingRoom) {
    const user = users.find((user) => user.index === socket.id);

    if (user) {
      const data = {
        roomId: user.index,
        roomUsers: [
          {
            name: user.name,
            index: user.index,
          },
        ],
      };
      roomUsers.push(data);
    }
  }

  console.log('rooms', roomUsers);
};

export default createRoom;
