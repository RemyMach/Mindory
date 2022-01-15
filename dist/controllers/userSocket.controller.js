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
exports.UserSocketController = void 0;
var models_1 = require("../models");
var userSocket_repository_1 = require("../repositories/userSocket.repository");
var UserSocketController = /** @class */ (function () {
    function UserSocketController(user, room, userSocket) {
        this.user = user;
        this.room = room;
        this.userSocket = userSocket;
    }
    UserSocketController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, room, userSocket;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(UserSocketController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, room = _a.room, userSocket = _a.userSocket;
                        UserSocketController.instance = new UserSocketController(user, room, userSocket);
                        _b.label = 2;
                    case 2: return [2 /*return*/, UserSocketController.instance];
                }
            });
        });
    };
    UserSocketController.prototype.createUserSocket = function (socketId, room) {
        return __awaiter(this, void 0, void 0, function () {
            var userSocket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSocket.create({ socketId: socketId })];
                    case 1:
                        userSocket = _a.sent();
                        return [4 /*yield*/, userSocket.setRoom(room)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, userSocket];
                }
            });
        });
    };
    UserSocketController.prototype.setUserOnASocket = function (userSocket, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userSocket.setUser(user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserSocketController.prototype.getUserSocketBySocketId = function (userSocketId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userSocket.findOne({ where: { socketId: userSocketId } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserSocketController.prototype.deleteUserSocket = function (userSocket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userSocket.destroy()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserSocketController.prototype.getAllUserSocketInARoom = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userSocket_repository_1.UserSocketRepository.getAllUserSocketInARoom(room)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserSocketController.prototype.getOtherUserInARoom = function (userSocketId, room) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userSocket_repository_1.UserSocketRepository.getTheOtherUserInARoom(userSocketId, room)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserSocketController.prototype.verifiyIfUsersSocketHaveUsers = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            var usersSocket, users;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userSocket_repository_1.UserSocketRepository.getAllUserSocketInARoom(room)];
                    case 1:
                        usersSocket = _a.sent();
                        return [4 /*yield*/, Promise.all(usersSocket.map(function (userSocket) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, userSocket.getUser()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 2:
                        users = _a.sent();
                        return [2 /*return*/, usersSocket.length == 2 && users.every(function (user) { return user !== null; })];
                }
            });
        });
    };
    return UserSocketController;
}());
exports.UserSocketController = UserSocketController;
