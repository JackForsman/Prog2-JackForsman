const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

io.on('connection', (socket) => {
    socket.broadcast.emit('hi')
})

server.listen(3000, () => {
    console.log('listening on *:3000')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('chat message', "A user has joined");

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('typing', () => {
        socket.broadcast.emit("chat message", "A user is typing...");
    });
  });
    

