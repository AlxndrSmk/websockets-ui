import { AddShipsData, ParsedAddShipsData, Socket } from 'types/types';

const addShips = (socket: Socket, data: AddShipsData) => {
  try {
    const parsedAddShipsData: ParsedAddShipsData = JSON.parse(data.data);

    const response = {
      type: 'add_ships',
      data: {
        ships: parsedAddShipsData.ships,
        currentPlayerIndex: parsedAddShipsData.indexPlayer,
      },
      id: 0,
    };
    socket.send(JSON.stringify(response));
  } catch {
    console.log('Something went wrong.');
  }
};

export default addShips;
