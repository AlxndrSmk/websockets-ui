import { ResponseData, Socket } from '../types/types';

const sendResponse = (responseData: ResponseData, socket: Socket) => {
  const response = {
    type: 'reg',
    data: JSON.stringify(responseData),
    id: 0,
  };
  socket.send(JSON.stringify(response));
};

export default sendResponse;
