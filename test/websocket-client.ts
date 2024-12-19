import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://192.168.1.50:4568');

socket.on('connect', () => {
  console.log('Connected to the WebSocket server');
});

// Emit a "message" event to the server
socket.emit('message', 'Hello from the client');

// Handle the response from the server
socket.on('message', (data) => {
  console.log('Received message from server:', data);
});
