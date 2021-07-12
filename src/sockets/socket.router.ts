import http from "http"
import { Server, Socket } from "socket.io";
import express, {Request, Response} from "express";
import 'express-async-errors';
import app from "../app";
import {addUserToARoom, removeUser, getNumberOfUser, getUserWhoPlayInFirst} from './user.socket';

const server = require('http').createServer(app);
const io = require('socket.io')(server);

/*app.get('/', (req, res) => {
    res.send('<!DOCTYPE html>\n' +
        '<html>\n' +
        '  <head>\n' +
        '    <title>Socket.IO chat</title>\n' +
        '    <style>\n' +
        '      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }\n' +
        '\n' +
        '      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }\n' +
        '      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }\n' +
        '      #input:focus { outline: none; }\n' +
        '      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }\n' +
        '\n' +
        '      #messages { list-style-type: none; margin: 0; padding: 0; }\n' +
        '      #messages > li { padding: 0.5rem 1rem; }\n' +
        '      #messages > li:nth-child(odd) { background: #efefef; }\n' +
        '    </style>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '    <ul id="messages"></ul>\n' +
        '    <form id="form" action="">\n' +
        '      <input id="input" autocomplete="off" /><button>Send</button>\n' +
        '    </form>\n' +
        '<script src="/socket.io/socket.io.js"></script>' +
        '<script>'+
        'var socket = io();'+
        '</script>'+
        '  </body>\n' +
        '</html>');
});*/

app.get('/', (req: Request, res: Response) => {
    return res.send().end();
});


io.on('connection', async (socket: Socket) => {

    console.log(`${socket.id} user is connected`)
    console.log(socket.handshake.query.room)
    console.log(socket.handshake.query.userToken)
    if(Array.isArray(socket.handshake.query.room) || Array.isArray(socket.handshake.query.userToken))
        return {error: 'the parameters are not valid'};

    const roomId = socket.handshake.query.room ? Number.parseInt(socket.handshake.query.room) : undefined;
    const userToken = socket.handshake.query.userToken ? socket.handshake.query.userToken : undefined;
    if(roomId === undefined)
        return {error: 'the parameters are not valid'};

    const numberOfUser = await getNumberOfUser(roomId);
    console.log(numberOfUser)
    if(numberOfUser < 2) {
        await addUserToARoom(socket,{id: socket.id, roomId, tokenSession: userToken})
    }
    const numberOfUserUpdate = await getNumberOfUser(roomId);
    if(numberOfUserUpdate == 2) {

        let userWhoPlayInFirst;
        userWhoPlayInFirst = await getUserWhoPlayInFirst(roomId);
        if('socketId' in userWhoPlayInFirst){
            console.log(userWhoPlayInFirst);
            io.to(String(roomId)).emit('userWhoPlayInFirst', (userWhoPlayInFirst.socketId));
            //socket.emit('userWhoPlayInFirst', (userWhoPlayInFirst.socketId));
        }
    }

    socket.on('cardReturn', async (data) => {
        console.log('card return');
        console.log(data);
    })

    socket.on('disconnect', async () => {
        console.log(`${socket.id} user is disconnected`)
        await removeUser(socket.id);
    })

    socket.on('disconnectCustom', async () => {
        console.log(`${socket.id} user is disconnected`)
        await removeUser(socket.id);
    })
});

export {
    server
}
