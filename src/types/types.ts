import { WebSocket } from 'ws';

export interface User {
  name: string;
  password: string;
  id: string;
}

export interface RoomUser extends User {
  wins: number;
}

export interface Game {
  gameId: string;
  userId: string;
  ships: string;
  isTurn: boolean;
}

export interface Room {
  id: string;
  roomUsers: RoomUser[];
}

export interface Socket extends WebSocket {
  id: string;
}

export interface Winner {
  name: string;
  winsCount: number;
}

export interface AuthData {
  type: string;
  data: string;
  id: number;
}

export interface ResponseData {
  name?: string;
  index?: string;
  error: boolean;
  errorText: string;
}
