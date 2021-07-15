import http from "http"
import { Server, Socket } from "socket.io";
import express, {Request, Response} from "express";
import 'express-async-errors';
import app from "../app";
import {
    addUserToARoom,
    removeUser,
    getNumberOfUser,
    getUserWhoPlayInFirst,
    getRoomOfAUser,
    getOtherUserInARoom, verifyUserAuthentified
} from './user.socket';

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req: Request, res: Response) => {
    return res.send().end();
});


io.on('connection', async (socket: Socket) => {

    /*console.log(`${socket.id} user is connected`)
    console.log(socket.handshake.query.room)
    console.log(socket.handshake.query.userToken)*/
    if(Array.isArray(socket.handshake.query.room) || Array.isArray(socket.handshake.query.userToken))
        return {error: 'the parameters are not valid'};

    const roomId = socket.handshake.query.room ? Number.parseInt(socket.handshake.query.room) : undefined;
    const userToken = socket.handshake.query.userToken ? socket.handshake.query.userToken : undefined;
    if(roomId === undefined)
        return {error: 'the parameters are not valid'};

    const numberOfUser = await getNumberOfUser(roomId);
    if(numberOfUser < 2) {
        await addUserToARoom(socket,{id: socket.id, roomId, tokenSession: userToken})
    }
    const numberOfUserUpdate = await getNumberOfUser(roomId);
    if(numberOfUserUpdate == 2) {

        let userWhoPlayInFirst;
        userWhoPlayInFirst = await getUserWhoPlayInFirst(roomId);
        if('socketId' in userWhoPlayInFirst){
            const usersAuthentified = await verifyUserAuthentified(roomId)
            io.to(String(roomId)).emit('userWhoPlayInFirst', (userWhoPlayInFirst.socketId));
            if(usersAuthentified)
                io.to(String(roomId)).emit('UsersAreAuthentified', '');
            else
                io.to(String(roomId)).emit('UsersAreNotAuthentified', '');
            //socket.emit('userWhoPlayInFirst', (userWhoPlayInFirst.socketId));
        }
    }

    socket.on('cardReturn', async (data: string) => {
        const room = await getRoomOfAUser(socket.id);
        if(room !== null && 'id' in room)
            socket.broadcast.to(String(room.id)).emit('activateCard', data)

    })

    socket.on('hideCards', async (data) => {
        const room = await getRoomOfAUser(socket.id);
        if(room !== null && 'id' in room) {
            const otherUser = await getOtherUserInARoom(socket.id, room);
            if(otherUser.length !== 1)
                return {error: 'the length is not valid'};

            socket.broadcast.to(String(room.id)).emit('hideCards', data)
            io.to(String(roomId)).emit('switchActivePlayer', (otherUser[0].socketId));
        }
    })

    socket.on('pairFound', async (data) => {
        const room = await getRoomOfAUser(socket.id);
        if(room !== null && 'id' in room)
            socket.broadcast.to(String(room.id)).emit('pairFoundByOther')
    })

    socket.on('gameFinished', async (data) => {
        const room = await getRoomOfAUser(socket.id);
        if(room !== null && 'id' in room) {
            const otherUser = await getOtherUserInARoom(socket.id, room);
            if (otherUser.length !== 1)
                return {error: 'the length is not valid'};
            socket.broadcast.to(String(room.id)).emit('gameFinished', '')
        }
    });

    socket.on('disconnect', async () => {
        console.log(`${socket.id} user is disconnected`)
        await removeUser(socket.id);
    });

    socket.on('disconnectCustom', async () => {
        console.log(`${socket.id} user is disconnected`)
        await removeUser(socket.id);
    });
});

export {
    server
}
