"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require("express-async-errors");
var app_1 = __importDefault(require("../app"));
var user_socket_1 = require("./user.socket");
var server = require('http').createServer(app_1.default);
exports.server = server;
var io = require('socket.io')(server);
app_1.default.get('/', function (req, res) {
    return res.send().end();
});
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var roomId, userToken, numberOfUser, numberOfUserUpdate, userWhoPlayInFirst, usersAuthentified;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (Array.isArray(socket.handshake.query.room) || Array.isArray(socket.handshake.query.userToken))
                    return [2 /*return*/, { error: 'the parameters are not valid' }];
                roomId = socket.handshake.query.room ? Number.parseInt(socket.handshake.query.room) : undefined;
                userToken = socket.handshake.query.userToken ? socket.handshake.query.userToken : undefined;
                if (roomId === undefined)
                    return [2 /*return*/, { error: 'the parameters are not valid' }];
                return [4 /*yield*/, (0, user_socket_1.getNumberOfUser)(roomId)];
            case 1:
                numberOfUser = _a.sent();
                if (!(numberOfUser < 2)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, user_socket_1.addUserToARoom)(socket, { id: socket.id, roomId: roomId, tokenSession: userToken })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, (0, user_socket_1.getNumberOfUser)(roomId)];
            case 4:
                numberOfUserUpdate = _a.sent();
                if (!(numberOfUserUpdate == 2)) return [3 /*break*/, 7];
                userWhoPlayInFirst = void 0;
                return [4 /*yield*/, (0, user_socket_1.getUserWhoPlayInFirst)(roomId)];
            case 5:
                userWhoPlayInFirst = _a.sent();
                if (!('socketId' in userWhoPlayInFirst)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, user_socket_1.verifyUserAuthentified)(roomId)];
            case 6:
                usersAuthentified = _a.sent();
                io.to(String(roomId)).emit('userWhoPlayInFirst', (userWhoPlayInFirst.socketId));
                if (usersAuthentified)
                    io.to(String(roomId)).emit('UsersAreAuthentified', '');
                else
                    io.to(String(roomId)).emit('UsersAreNotAuthentified', '');
                _a.label = 7;
            case 7:
                socket.on('cardReturn', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var room;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, user_socket_1.getRoomOfAUser)(socket.id)];
                            case 1:
                                room = _a.sent();
                                if (room !== null && 'id' in room)
                                    socket.broadcast.to(String(room.id)).emit('activateCard', data);
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('hideCards', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var room, otherUser;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, user_socket_1.getRoomOfAUser)(socket.id)];
                            case 1:
                                room = _a.sent();
                                if (!(room !== null && 'id' in room)) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, user_socket_1.getOtherUserInARoom)(socket.id, room)];
                            case 2:
                                otherUser = _a.sent();
                                if (otherUser.length !== 1)
                                    return [2 /*return*/, { error: 'the length is not valid' }];
                                socket.broadcast.to(String(room.id)).emit('hideCards', data);
                                io.to(String(roomId)).emit('switchActivePlayer', (otherUser[0].socketId));
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('pairFound', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var room;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, user_socket_1.getRoomOfAUser)(socket.id)];
                            case 1:
                                room = _a.sent();
                                if (room !== null && 'id' in room)
                                    socket.broadcast.to(String(room.id)).emit('pairFoundByOther');
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('gameFinished', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var room, otherUser;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, user_socket_1.getRoomOfAUser)(socket.id)];
                            case 1:
                                room = _a.sent();
                                if (!(room !== null && 'id' in room)) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, user_socket_1.getOtherUserInARoom)(socket.id, room)];
                            case 2:
                                otherUser = _a.sent();
                                if (otherUser.length !== 1)
                                    return [2 /*return*/, { error: 'the length is not valid' }];
                                socket.broadcast.to(String(room.id)).emit('gameFinished', '');
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, user_socket_1.removeUser)(socket.id)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('disconnectCustom', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var room, otherUser;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, user_socket_1.getRoomOfAUser)(socket.id)];
                            case 1:
                                room = _a.sent();
                                if (!(room !== null && 'id' in room)) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, user_socket_1.getOtherUserInARoom)(socket.id, room)];
                            case 2:
                                otherUser = _a.sent();
                                if (otherUser.length === 1) {
                                    socket.broadcast.to(String(room.id)).emit('otherUserDisconnected');
                                }
                                _a.label = 3;
                            case 3: return [4 /*yield*/, (0, user_socket_1.removeUser)(socket.id)];
                            case 4:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
