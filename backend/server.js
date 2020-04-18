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
io.on('connection', socket => {
    console.log('new connection');

    socket.on('join', ({ name, room }, cb) => {
        console.log(name, room);
        const user = { id: socket.id, name, room };
        const { error } = addUser(user);
        if(error) return cb(error);

        socket.emit('message', { user: 'admin', text: `Welcome, ${user.name}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat room` });
        socket.join(user.room);
        cb();
    });

    // handle user messages
    socket.on('user_message', (message, cb) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        cb();
    });

    socket.on('disconnect', () => console.log('disconnected'));
});

server.listen(PORT, () => `Server running on port ${PORT}`);
