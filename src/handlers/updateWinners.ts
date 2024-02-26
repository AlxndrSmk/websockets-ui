import { connections, winners } from '../server/database';

const updateWinners = () => {
  try {
    if (!winners.length) return;

    const response = {
      type: 'update_winners',
      data: JSON.stringify(winners),
      id: 0,
    };

    connections.forEach((connection) => {
      connection.send(JSON.stringify(response));
    });
  } catch {
    console.log('Something went wrong.');
  }
};

export default updateWinners;
