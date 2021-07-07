import http from "http"
import { Server, Socket } from "socket.io";
import 'express-async-errors';
import app from "../app";

const server = http.createServer(app);
const io = new Server(server, {path: '/socket'});

io.on('connection', (socket: Socket) => {
    console.log(`${socket} user is connected`)
});
