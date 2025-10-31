// // node server for socket.io to manage connections

// // const { Socket } = require('socket.io');

// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket=>{
//     socket.on('new-user-joined', name =>{
        

//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name)
//         console.log("New user", name)
//     });

//     socket.on('send', message =>{
//         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//     });
// })

// const io = require('socket.io')(8000, {
//     cors: {
//         origin: "http://127.0.0.1:5500", // ya "http://localhost:5500"
//         methods: ["GET", "POST"]
//     }
// });

// const users = {};

// io.on('connection', socket => {
//     console.log('New connection:', socket.id);

//     socket.on('new-user-joined', name => {
//         console.log('New user:', name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     });

//         socket.on('disconnect', message => {
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id]
//     });
    



    // socket.on('disconnect', () => {
    //     socket.broadcast.emit('left', users[socket.id]);
    //     delete users[socket.id];
    // });
// });
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } // allow all origins
});

const PORT = process.env.PORT || 8000; // dynamic port for Render

// Serve frontend files
app.use(express.static(__dirname));

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', socket => {
    console.log('New connection:', socket.id);

    socket.on('new-user-joined', name => {
        console.log('New user:', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

// Start server
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
