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
  type: string;
  data: string;
  id: number;
}

export interface AddUserToRoomData {
  indexRoom: number | string;
}

export interface StartGameResponse {
  type: string;
  data: {
    ships: Ship[];
    currentPlayerIndex: number | string;
  };
  id: number;
}

interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface AddShipsData {
  type: string;
  data: string;
  id: number;
}

export interface ParsedAddShipsData {
  gameId: number | string;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }
  ];
  indexPlayer: number | string;
}

export interface AttackData {
  type: string;
  data: string;
  id: number;
}

export interface StartGameData {
  type: string;
  data: string;
  id: number;
}

export interface ParsedStartGameData {
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }
  ];
  currentPlayerIndex: number | string;
}

export interface AttackDataResponse {
  type: string;
  data: {
    position: {
      x: number;
      y: number;
    };
    currentPlayer: number | string;
    status: 'miss' | 'killed' | 'shot';
  };
  id: number;
}
