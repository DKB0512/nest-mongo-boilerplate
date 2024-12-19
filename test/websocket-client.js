"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var socket = (0, socket_io_client_1.io)('http://192.168.1.50:4568');
socket.on('connect', function () {
    console.log('Connected to the WebSocket server');
});
// Emit a "message" event to the server
socket.emit('message', 'Hello from the client');
// Handle the response from the server
socket.on('message', function (data) {
    console.log('Received message from server:', data);
});
