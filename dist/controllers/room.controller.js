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
exports.RoomController = void 0;
var models_1 = require("../models");
var password_reset_1 = require("../utils/password_reset/password_reset");
var room_repository_1 = require("../repositories/room.repository");
var userSocket_repository_1 = require("../repositories/userSocket.repository");
var RoomController = /** @class */ (function () {
    function RoomController(user, userSocket, part, room, deck) {
        this.user = user;
        this.userSocket = userSocket;
        this.part = part;
        this.room = room;
        this.deck = deck;
    }
    RoomController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, userSocket, part, room, deck;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(RoomController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, userSocket = _a.userSocket, part = _a.part, room = _a.room, deck = _a.deck;
                        RoomController.instance = new RoomController(user, userSocket, part, room, deck);
                        _b.label = 2;
                    case 2: return [2 /*return*/, RoomController.instance];
                }
            });
        });
    };
    RoomController.prototype.createRoom = function (part) {
        return __awaiter(this, void 0, void 0, function () {
            var token, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = (0, password_reset_1.generateToken)();
                        return [4 /*yield*/, this.room.create({ token: token })];
                    case 1:
                        room = _a.sent();
                        return [4 /*yield*/, room.setPart(part)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, room];
                }
            });
        });
    };
    RoomController.prototype.deleteAllRoomsForAUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var rooms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_repository_1.RoomRepository.getAllRoomForAUser(user)];
                    case 1:
                        rooms = _a.sent();
                        if (!rooms)
                            return [2 /*return*/];
                        return [4 /*yield*/, room_repository_1.RoomRepository.destroyRooms(rooms)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.getRoomUpForAUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_repository_1.RoomRepository.getAllRoomForAUser(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RoomController.prototype.updateRoomKeyWord = function (room, keyWord) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_repository_1.RoomRepository.updateKeyWord(room, keyWord)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.getRoomByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_repository_1.RoomRepository.getRoomByToken(token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RoomController.prototype.verifyIfTheRoomHasBeenPlayed = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            var part, shots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room.getPart()];
                    case 1:
                        part = _a.sent();
                        return [4 /*yield*/, part.getShots()];
                    case 2:
                        shots = _a.sent();
                        return [2 /*return*/, shots.length > 0];
                }
            });
        });
    };
    RoomController.prototype.roomIsAvailableForANewUserOrUserIsInTheRoom = function (room, user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getUserSocketNumberInARoom(room)];
                    case 1: return [2 /*return*/, (_b.sent()) <= 1];
                    case 2: return [4 /*yield*/, userSocket_repository_1.UserSocketRepository.getUserWhoHaveUserSocketInTheRoom(user, room)];
                    case 3:
                        _a = (_b.sent()) !== null;
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getUserSocketNumberInARoom(room)];
                    case 4:
                        _a = (_b.sent()) <= 1;
                        _b.label = 5;
                    case 5: return [2 /*return*/, _a];
                }
            });
        });
    };
    RoomController.prototype.getUserSocketNumberInARoom = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            var userSockets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room.getUserSockets()];
                    case 1:
                        userSockets = _a.sent();
                        return [2 /*return*/, userSockets.length];
                }
            });
        });
    };
    RoomController.prototype.getRoomOfAUserSocket = function (userSocket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userSocket.getRoom()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RoomController.prototype.keyWordIsUniqueInRoomUp = function (keyWord) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_repository_1.RoomRepository.getRoomWithAKeyWord(keyWord)];
                    case 1:
                        room = _a.sent();
                        return [2 /*return*/, room === null];
                }
            });
        });
    };
    RoomController.prototype.getARoomByKeyword = function (keyWord) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, room_repository_1.RoomRepository.getRoomWithAKeyWord(keyWord)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RoomController;
}());
exports.RoomController = RoomController;
