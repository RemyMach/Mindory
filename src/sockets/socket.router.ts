import http from "http"
import { Server, Socket } from "socket.io";
import 'express-async-errors';
import app from "../app";

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/socket', (req, res) => {
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
});


io.on('connection', (socket: any) => {
    console.log(`${socket} user is connected`)
});

export {
    server
}
