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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAuthentified = exports.getOtherUserInARoom = exports.getRoomOfAUser = exports.getUserWhoPlayInFirst = exports.getNumberOfUser = exports.removeUser = exports.addUserToARoom = void 0;
var user_controller_1 = require("../controllers/user.controller");
var room_controller_1 = require("../controllers/room.controller");
var userSocket_controller_1 = require("../controllers/userSocket.controller");
var addUserToARoom = function (socket, _a) {
    var id = _a.id, tokenSession = _a.tokenSession, roomId = _a.roomId;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, userController, roomController, room, userSocketController, userSocket;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(tokenSession && tokenSession !== 'undefined')) return [3 /*break*/, 3];
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _b.sent();
                    return [4 /*yield*/, userController.authenticateUserWithToken(tokenSession)];
                case 2:
                    user = _b.sent();
                    if (user === undefined) {
                        return [2 /*return*/, {
                                error: 'the user is not valid'
                            }];
                    }
                    else if (user === null) {
                        return [2 /*return*/, {
                                error: 'the user is not valid'
                            }];
                    }
                    _b.label = 3;
                case 3: return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
                case 4:
                    roomController = _b.sent();
                    return [4 /*yield*/, roomController.room.findByPk(roomId)];
                case 5:
                    room = _b.sent();
                    if (!room) {
                        return [2 /*return*/, {
                                error: 'the room filled is not valid'
                            }];
                    }
                    return [4 /*yield*/, userSocket_controller_1.UserSocketController.getInstance()];
                case 6:
                    userSocketController = _b.sent();
                    return [4 /*yield*/, userSocketController.createUserSocket(id, room)];
                case 7:
                    userSocket = _b.sent();
                    addUserIntoASocketRoom(socket, roomId);
                    if (!user) return [3 /*break*/, 9];
                    return [4 /*yield*/, userSocketController.setUserOnASocket(userSocket, user)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.addUserToARoom = addUserToARoom;
var removeUser = function (socketId) { return __awaiter(void 0, void 0, void 0, function () {
    var userSocketController, userSocket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSocket_controller_1.UserSocketController.getInstance()];
            case 1:
                userSocketController = _a.sent();
                return [4 /*yield*/, userSocketController.getUserSocketBySocketId(socketId)];
            case 2:
                userSocket = _a.sent();
                if (userSocket === null) {
                    return [2 /*return*/, {
                            error: 'the socket id doesn\'t exist in this room'
                        }];
                }
                return [4 /*yield*/, userSocketController.deleteUserSocket(userSocket)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.removeUser = removeUser;
var getNumberOfUser = function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
    var roomController, room;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
            case 1:
                roomController = _a.sent();
                return [4 /*yield*/, roomController.room.findByPk(roomId)];
            case 2:
                room = _a.sent();
                if (!room) {
                    return [2 /*return*/, {
                            error: 'the room filled is not valid'
                        }];
                }
                return [4 /*yield*/, roomController.getUserSocketNumberInARoom(room)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getNumberOfUser = getNumberOfUser;
var getUserWhoPlayInFirst = function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
    var userSocketController, roomController, room, users, randomNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSocket_controller_1.UserSocketController.getInstance()];
            case 1:
                userSocketController = _a.sent();
                return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
            case 2:
                roomController = _a.sent();
                return [4 /*yield*/, roomController.room.findByPk(roomId)];
            case 3:
                room = _a.sent();
                if (!room) {
                    return [2 /*return*/, {
                            error: 'the room filled is not valid'
                        }];
                }
                return [4 /*yield*/, userSocketController.getAllUserSocketInARoom(room)];
            case 4:
                users = _a.sent();
                randomNumber = Math.floor(Math.random() * 2);
                return [2 /*return*/, users[randomNumber]];
        }
    });
}); };
exports.getUserWhoPlayInFirst = getUserWhoPlayInFirst;
var addUserIntoASocketRoom = function (socket, roomId) {
    socket.join(String(roomId));
};
var getRoomOfAUser = function (socketId) { return __awaiter(void 0, void 0, void 0, function () {
    var userSocketController, roomController, userSocket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSocket_controller_1.UserSocketController.getInstance()];
            case 1:
                userSocketController = _a.sent();
                return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
            case 2:
                roomController = _a.sent();
                return [4 /*yield*/, userSocketController.getUserSocketBySocketId(socketId)];
            case 3:
                userSocket = _a.sent();
                if (userSocket === null) {
                    return [2 /*return*/, {
                            error: 'userSocket doesn\'t exist'
                        }];
                }
                return [2 /*return*/, roomController.getRoomOfAUserSocket(userSocket)];
        }
    });
}); };
exports.getRoomOfAUser = getRoomOfAUser;
var getOtherUserInARoom = function (socketId, room) { return __awaiter(void 0, void 0, void 0, function () {
    var userSocketController;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSocket_controller_1.UserSocketController.getInstance()];
            case 1:
                userSocketController = _a.sent();
                return [4 /*yield*/, userSocketController.getOtherUserInARoom(socketId, room)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getOtherUserInARoom = getOtherUserInARoom;
var verifyUserAuthentified = function (roomId) { return __awaiter(void 0, void 0, void 0, function () {
    var userSocketController, room;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userSocket_controller_1.UserSocketController.getInstance()];
            case 1:
                userSocketController = _a.sent();
                return [4 /*yield*/, userSocketController.room.findByPk(roomId)];
            case 2:
                room = _a.sent();
                if (room === null)
                    return [2 /*return*/, false];
                return [2 /*return*/, userSocketController.verifiyIfUsersSocketHaveUsers(room)];
        }
    });
}); };
exports.verifyUserAuthentified = verifyUserAuthentified;
