const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);
// initialize socket.io and attach it with the http server
const io = socketIo(server);

app.use(express.static('public'));

const users = new Set();

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // handle users when they will join the chat
    socket.on('join', (username) => {
        users.add(username);
        socket.userName = username;
        console.log(`${username} has joined the chat.`);
        
        // broadcast to all clients/users that a new user has joined
        io.emit('userJoined', {
            username: username,
            users: Array.from(users)
        });
        // send the updated user list to all clients
        io.emit('userList', Array.from(users));
    });

    // handle incoming chat messages
    socket.on('message', (data) => {
        // Only broadcast if both username and message are present
        if (data && data.username && data.message) {
            io.emit('message', data);
        }
    });

    // handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        
        // remove the user from the set
        users.forEach((username) => {
            if (username === socket.id) {
                users.delete(username);
            }
        });

        // broadcast to all clients/users that a user has left
        io.emit('userLeft', {
            username: socket.id,
            users: Array.from(users)
        });
        // send the updated user list to all clients
        io.emit('userList', Array.from(users));
    });
});

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})