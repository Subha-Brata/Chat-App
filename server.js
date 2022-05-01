const express= require('express');
const path= require('path');
const http =require('http');
const socketio=require('socket.io');
const format= require('./utils/messages')

const app=express();
const server =http.createServer(app);
const io= socketio(server);
const botname='chatbot';

app.use(express.static(path.join(__dirname,'public')));

io.on('connection',socket=>{
     socket.broadcast.emit('message',format(botname,'new user just joined'));

    socket.on('disconnect',()=>{
        io.emit('message',format(botname,'A user just left the room'));
    });
    socket.on('chatm',msg=>{
    io.emit('message',format('User',msg));
    });
});

server.listen(3000,()=>
console.log(`server is running on port 3000....`));