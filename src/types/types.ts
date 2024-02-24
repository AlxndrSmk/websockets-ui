import { WebSocket } from 'ws';

export interface User {
  name: string;
  index: number | string;
  password?: string;
}

export interface Player {
  name: string;
  password: string;
  index: number | string;
  wins: number;
}

export interface RoomUser {
  password?: string;
  index: number | string;
}

export interface Game {
  gameId: number | string;
  userId: number | string;
  ships: string;
  isTurn: boolean;
}

export interface RoomData {
  roomId: number | string;
  roomUsers: RoomUser[];
}

export interface Socket extends WebSocket {
  index: string | number;
}

export interface Winner {
  name: string;
  wins: number;
}

export interface AuthData {
  type: string;
  data: string;
  id: number | string;
}

export interface ResponseData {
  name?: string;
  index?: number | string;
  error: boolean;
  errorText: string;
}

export interface RoomUsers {
  name: number | string;
  index: number | string;
}

export interface Room {
  roomId: number | string;
  roomUsers: RoomUsers[];
}

export interface AddUserToRoom {
  data: string;
}
