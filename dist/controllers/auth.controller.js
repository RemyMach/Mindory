"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AuthController = void 0;
var sequelize_1 = require("sequelize");
var models_1 = require("../models");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var AuthController = /** @class */ (function () {
    function AuthController(user, session, role) {
        this.user = user;
        this.session = session;
        this.role = role;
    }
    AuthController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, session, role;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(AuthController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, session = _a.session, role = _a.role;
                        AuthController.instance = new AuthController(user, session, role);
                        _b.label = 2;
                    case 2: return [2 /*return*/, AuthController.instance];
                }
            });
        });
    };
    AuthController.prototype.subscribe = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var user, user_role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.create(__assign({}, props))];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.role.findOne({
                                where: {
                                    label: "user"
                                }
                            })];
                    case 2:
                        user_role = _a.sent();
                        if (user_role === null) {
                            throw new Error("Role doesn't find");
                        }
                        return [4 /*yield*/, user.setRole(user_role)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthController.prototype.log = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isSamePassword, token, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.later(1000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.user.findOne({
                                where: {
                                    email: props.email
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (user === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, (0, bcrypt_1.compare)(props.password, user.password)];
                    case 3:
                        isSamePassword = _a.sent();
                        if (!isSamePassword) {
                            return [2 /*return*/, null];
                        }
                        token = (0, jsonwebtoken_1.sign)({ id: user.id.toString() }, process.env.JWT_SECRET);
                        return [4 /*yield*/, this.session.create({
                                token: token
                            })];
                    case 4:
                        session = _a.sent();
                        return [4 /*yield*/, session.setUser(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, session];
                }
            });
        });
    };
    AuthController.prototype.deleteSession = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var authController, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuthController.getInstance()];
                    case 1:
                        authController = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, authController.session.destroy({
                                where: {
                                    token: token
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getSession = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
                        return [4 /*yield*/, this.session.findOne({
                                where: {
                                    token: token
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.getSpecificRoleSession = function (token, roles) {
        return __awaiter(this, void 0, void 0, function () {
            var roles_formated, session, e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        roles_formated = roles.map(function (role) {
                            return { 'label': role };
                        });
                        return [4 /*yield*/, this.session.findOne({
                                where: {
                                    token: token
                                },
                                include: {
                                    required: true,
                                    model: this.user,
                                    include: [{
                                            required: true,
                                            model: this.role,
                                            where: (_a = {},
                                                _a[sequelize_1.Op.or] = roles_formated,
                                                _a)
                                        }],
                                },
                            })];
                    case 1:
                        session = _b.sent();
                        return [2 /*return*/, session];
                    case 2:
                        e_3 = _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.later = function (delay) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(resolve, delay);
                    })];
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
