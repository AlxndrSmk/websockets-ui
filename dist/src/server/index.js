"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const handlePlayerAuth_1 = __importDefault(require("../handlers/handlePlayerAuth"));
const port = 3000;
const start = () => {
    const wss = new ws_1.WebSocketServer({ port });
    wss.on('connection', (socket) => {
        console.log('Player connected');
        socket.on('message', (message) => {
            const data = JSON.parse(message);
            console.log('Received:', data);
            if (data.type === 'reg') {
                (0, handlePlayerAuth_1.default)(socket, data);
                console.log('запрос отправлен!');
            }
        });
        socket.on('close', () => {
            console.log('Player disconnected');
        });
    });
};
start();
//# sourceMappingURL=index.js.map