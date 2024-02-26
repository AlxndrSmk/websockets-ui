import { connections, roomUsers } from '../server/database';
import { Room, RoomUsers } from 'types/types';

const handleUpdateRoom = () => {
  try {
    const roomData: Room[] = [];

    for (const room of roomUsers) {
      if (room.roomUsers.length === 1) {
        const roomUsers: RoomUsers[] = room.roomUsers.map((user) => ({
          name: user.name,
          index: user.index,
        }));

        roomData.push({
          roomId: room.roomId,
          roomUsers,
        });
      }
    }
    const response = {
      type: 'update_room',
      data: JSON.stringify(roomData),
      id: 0,
    };

    connections.forEach((socket) => {
      socket.send(JSON.stringify(response));
    });
  } catch {
    console.log('Something went wrong.');
  }
};

export default handleUpdateRoom;
