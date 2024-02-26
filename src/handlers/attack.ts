import { AttackData, AttackDataResponse, Socket } from 'types/types';

const attack = (socket: Socket, data: AttackData) => {
  try {
    const { attackData } = JSON.parse(data.data);

    const response: AttackDataResponse = {
      type: 'attack',
      data: {
        position: {
          x: attackData.x,
          y: attackData.y,
        },
        currentPlayer: attackData.indexPlayer,
        status: 'miss',
      },
      id: 0,
    };
    socket.send(JSON.stringify(response));
  } catch {
    console.log('Something went wrong.');
  }
};

export default attack;
