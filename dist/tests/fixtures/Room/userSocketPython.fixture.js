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
exports.UserSocketPythonFixture = void 0;
var models_1 = require("../../../models");
var roomPython_fixture_1 = require("./roomPython.fixture");
var user_fixture_1 = require("../user.fixture");
var UserSocketPythonFixture = /** @class */ (function () {
    function UserSocketPythonFixture() {
    }
    UserSocketPythonFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (UserSocketPythonFixture.instance === undefined) {
                    UserSocketPythonFixture.instance = new UserSocketPythonFixture();
                }
                return [2 /*return*/, UserSocketPythonFixture.instance];
            });
        });
    };
    ;
    UserSocketPythonFixture.prototype.fillTable = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var manager, roomPythonFixture, userFixture, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _o.sent();
                        return [4 /*yield*/, roomPython_fixture_1.RoomPythonFixture.getInstance()];
                    case 2:
                        roomPythonFixture = _o.sent();
                        return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                    case 3:
                        userFixture = _o.sent();
                        _j = this;
                        return [4 /*yield*/, manager.userSocket.create({ socketId: 'dtfgyuhijkolknjbhvgyhbjncsdwffds' })];
                    case 4:
                        _j.user_socket_1 = _o.sent();
                        return [4 /*yield*/, this.user_socket_1.setRoom(roomPythonFixture.room_1)];
                    case 5:
                        _o.sent();
                        return [4 /*yield*/, ((_a = this.user_socket_1) === null || _a === void 0 ? void 0 : _a.setUser(userFixture.user_jean))];
                    case 6:
                        _o.sent();
                        return [4 /*yield*/, ((_b = this.user_socket_1) === null || _b === void 0 ? void 0 : _b.destroy())];
                    case 7:
                        _o.sent();
                        _k = this;
                        return [4 /*yield*/, manager.userSocket.create({ socketId: 'fsdfsgkfgkosdpfojqfpffeff' })];
                    case 8:
                        _k.user_socket_2 = _o.sent();
                        return [4 /*yield*/, this.user_socket_2.setRoom(roomPythonFixture.room_1)];
                    case 9:
                        _o.sent();
                        return [4 /*yield*/, ((_c = this.user_socket_2) === null || _c === void 0 ? void 0 : _c.setUser(userFixture.user_admin_rachel))];
                    case 10:
                        _o.sent();
                        return [4 /*yield*/, ((_d = this.user_socket_2) === null || _d === void 0 ? void 0 : _d.destroy())];
                    case 11:
                        _o.sent();
                        _l = this;
                        return [4 /*yield*/, manager.userSocket.create({ socketId: 'dfjsfkqfdsfdsqdkspocjskdcojpsdc' })];
                    case 12:
                        _l.user_socket_3 = _o.sent();
                        return [4 /*yield*/, this.user_socket_3.setRoom(roomPythonFixture.room_2)];
                    case 13:
                        _o.sent();
                        return [4 /*yield*/, ((_e = this.user_socket_3) === null || _e === void 0 ? void 0 : _e.setUser(userFixture.user_jean))];
                    case 14:
                        _o.sent();
                        return [4 /*yield*/, ((_f = this.user_socket_3) === null || _f === void 0 ? void 0 : _f.destroy())];
                    case 15:
                        _o.sent();
                        _m = this;
                        return [4 /*yield*/, manager.userSocket.create({ socketId: 'poffdssfdofhiskpfdfsdfsdfjdsk' })];
                    case 16:
                        _m.user_socket_4 = _o.sent();
                        return [4 /*yield*/, this.user_socket_4.setRoom(roomPythonFixture.room_2)];
                    case 17:
                        _o.sent();
                        return [4 /*yield*/, ((_g = this.user_socket_4) === null || _g === void 0 ? void 0 : _g.setUser(userFixture.user_admin_rachel))];
                    case 18:
                        _o.sent();
                        return [4 /*yield*/, ((_h = this.user_socket_4) === null || _h === void 0 ? void 0 : _h.destroy())];
                    case 19:
                        _o.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserSocketPythonFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.userSocket.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.userSocket.destroy({
                                truncate: true,
                                force: true,
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserSocketPythonFixture;
}());
exports.UserSocketPythonFixture = UserSocketPythonFixture;
