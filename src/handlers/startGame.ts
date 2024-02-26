import {
  ParsedStartGameData,
  Socket,
  StartGameData,
  StartGameResponse,
} from 'types/types';

const startGame = (socket: Socket, data: StartGameData) => {
  try {
    const parsedStartGameData: ParsedStartGameData = JSON.parse(data.data);

    const response: StartGameResponse = {
      type: 'start_game',
      data: {
        ships: parsedStartGameData.ships,
        currentPlayerIndex: parsedStartGameData.currentPlayerIndex,
      },
      id: 0,
    };
    socket.send(JSON.stringify(response));
  } catch {
    console.log('Something went wromg.˝');
  }
};

export default startGame;
