const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
app.get('/', router);

const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('join', ({ name, room }, cb) => {
        console.log(name, room);
        const { error, user } = addUser({ id: socket.id, name, room });
        if(error) return cb(error);

        socket.emit('sys_message', { user: 'admin', text: `Welcome to the ${user.room} chat room, ${user.name}` });
        socket.broadcast.to(user.room).emit('sys_message', { user: 'admin', text: `${user.name} has joined the chat room` });
        socket.join(user.room);
    });

    socket.on('disconnect', () => console.log('disconnected'));
});

server.listen(PORT, () => `Server running on port ${PORT}`);
