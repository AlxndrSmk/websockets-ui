import { AddShipsData, Socket, StartGameResponse } from 'types/types';

const startGame = (socket: Socket, data: AddShipsData) => {
  const response: StartGameResponse = {
    type: 'start_game',
    data: {
      ships: [],
      currentPlayerIndex: 0,
    },
    id: 0,
  };
  console.log('data', data);
  socket.send(JSON.stringify(response));
};

export default startGame;
