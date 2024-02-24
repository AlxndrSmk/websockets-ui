import { AddUserToRoom, Socket } from 'types/types';

const addUserToRoom = (socket: Socket, data: AddUserToRoom) => {
  const roomIndex = data.data;

  const response = {
    type: 'add_user_to_room',
    data: JSON.stringify({
      indexRoom: roomIndex.indexRoom,
    }),
    id: 0,
  };

  socket.send(JSON.stringify(response));
};

export default addUserToRoom;
