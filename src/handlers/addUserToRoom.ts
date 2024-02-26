import { roomUsers, users } from '../server/database';
import { AddUserToRoom, AddUserToRoomData, Room, Socket } from 'types/types';
import createGame from './createGame';

const addUserToRoom = (socket: Socket, data: AddUserToRoom) => {
  try {
    let updatedRoomUsers = roomUsers;
    const parsedData: AddUserToRoomData = JSON.parse(data.data);

    if (parsedData.indexRoom === socket.index) return;

    const targetUser = users.find((user) => user.index === socket.index);
    const targetRoom = roomUsers.find(
      (room: Room) => room.roomId === parsedData.indexRoom
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
        indexRoom: parsedData.indexRoom,
      }),
      id: 0,
    };

    socket.send(JSON.stringify(response));
    createGame(data);
  } catch {
    console.log('Something went wrong.');
  }
};

export default addUserToRoom;
