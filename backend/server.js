const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
app.get('/', router);

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('disconnect', () => console.log('disconnected'));
});

server.listen(PORT, () => `Server running on port ${PORT}`);
