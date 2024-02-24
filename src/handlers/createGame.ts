import { connections, roomUsers } from '../server/database';
import { AddUserToRoom, Room } from 'types/types';

const createGame = (data: AddUserToRoom) => {
  const indexRoom = JSON.parse(data.data);
  let updatedRoomUsers = roomUsers;

  const targetRoom = roomUsers.find(
    (room: Room) => room.roomId === indexRoom.indexRoom
  );

  const firstUser = targetRoom?.roomUsers.find(
    (user) => user.index === indexRoom.indexRoom
  );

  const secondUser = targetRoom?.roomUsers.filter(
    (user) => user.index !== firstUser?.index
  )[0];

  const responseFirstUser = {
    type: 'create_game',
    data: JSON.stringify({
      idGame: firstUser?.index,
      idPlayer: firstUser?.index,
    }),
    id: 0,
  };

  const responseSecondUser = {
    type: 'create_game',
    data: JSON.stringify({
      idGame: firstUser?.index,
      idPlayer: secondUser?.index,
    }),
    id: 0,
  };

  const connectionFirstUser = connections.find(
    (user) => user.index === firstUser?.index
  );

  const connectionSecondUser = connections.find(
    (user) => user.index === secondUser?.index
  );

  connectionFirstUser?.send(JSON.stringify(responseFirstUser));
  connectionSecondUser?.send(JSON.stringify(responseSecondUser));

  updatedRoomUsers = roomUsers.filter(
    (room) => room.roomId !== targetRoom?.roomId
  );
};

export default createGame;
