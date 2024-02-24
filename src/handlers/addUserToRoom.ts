import { roomUsers, users } from '../server/database';
import { AddUserToRoom, Room, Socket } from 'types/types';

const addUserToRoom = (socket: Socket, data: AddUserToRoom) => {
  let updatedRoomUsers = roomUsers;

  try {
    const roomIndex = JSON.parse(data.data);

    console.log('roomIndex is: :', roomIndex);
    if (roomIndex.indexRoom === socket.index) {
      return;
    } else {
      const targetUser = users.find((user) => user.index === socket.index);

      const targetRoom = roomUsers.find(
        (room: Room) => room.roomId === roomIndex.indexRoom
      );

      if (roomUsers.find((room) => room.roomId === targetUser?.index)) {
        updatedRoomUsers = roomUsers.filter(
          (room) => room.roomId !== targetUser?.index
        );
      }

      if (targetUser) {
        targetRoom?.roomUsers.push(targetUser);
      }

      const response = {
        type: 'add_user_to_room',
        data: JSON.stringify({
          indexRoom: roomIndex.indexRoom,
        }),
        id: 0,
      };

      socket.send(JSON.stringify(response));
    }
  } catch (err) {
    console.log('Error parsing JSON: ', err);
    return;
  }
};

export default addUserToRoom;
