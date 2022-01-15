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
exports.UserController = void 0;
var models_1 = require("../models");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_repository_1 = require("../repositories/user.repository");
var bcrypt_1 = require("bcrypt");
var UserController = /** @class */ (function () {
    function UserController(user, role, session) {
        this.user = user;
        this.role = role;
        this.session = session;
    }
    UserController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, role, session;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(UserController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, role = _a.role, session = _a.session;
                        UserController.instance = new UserController(user, role, session);
                        _b.label = 2;
                    case 2: return [2 /*return*/, UserController.instance];
                }
            });
        });
    };
    UserController.prototype.getAll = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = limit || 30;
                        offset = offset || 0;
                        return [4 /*yield*/, user_repository_1.UserRepository.getAllUsers(offset, limit)];
                    case 1:
                        res = _a.sent();
                        if (res.length > 0) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    UserController.prototype.getUser = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
                        return [4 /*yield*/, user_repository_1.UserRepository.getUserByToken(token)];
                    case 1:
                        user = _a.sent();
                        if (user !== null) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (token, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (props.email === undefined)
                            delete props.email;
                        if (props.name === undefined)
                            delete props.name;
                        if (props.surname === undefined)
                            delete props.surname;
                        return [4 /*yield*/, user_repository_1.UserRepository.updateUser(token, props)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.resetPassword = function (user, new_password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.updateUserpassword(user, new_password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.changePassword = function (user, new_password, oldPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var isSamePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcrypt_1.compare)(oldPassword, user.password)];
                    case 1:
                        isSamePassword = _a.sent();
                        if (!isSamePassword) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, user_repository_1.UserRepository.updateUserpassword(user, new_password)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.updatePassword = function (token, props) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isSamePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.getUserEncryptedPassword(token)];
                    case 1:
                        user = _a.sent();
                        if (user === null) {
                            return [2 /*return*/, null];
                        }
                        if (props.new_password !== props.new_password_confirm) {
                            throw new Error('Error new_password and new_password_confirm are not they same');
                        }
                        return [4 /*yield*/, (0, bcrypt_1.compare)(props.password, user.password)];
                    case 2:
                        isSamePassword = _a.sent();
                        if (!isSamePassword) {
                            throw new Error("The password is invalid");
                        }
                        return [4 /*yield*/, user_repository_1.UserRepository.updateUserpassword(user, props.new_password)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (token, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isSamePassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.getUserEncryptedPassword(token)];
                    case 1:
                        user = _a.sent();
                        if (user === null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
                    case 2:
                        isSamePassword = _a.sent();
                        if (!isSamePassword) {
                            throw new Error("The password is invalid");
                        }
                        return [4 /*yield*/, user_repository_1.UserRepository.deleteUser(token)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.authenticateUserWithToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenWithoutBearer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (token === undefined) {
                            return [2 /*return*/, undefined];
                        }
                        tokenWithoutBearer = token.replace('Bearer ', '');
                        return [4 /*yield*/, this.getUserByToken(tokenWithoutBearer)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getUserByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.getUserByToken(token)];
                    case 1:
                        user = _a.sent();
                        if (user !== null) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    UserController.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (user !== null) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
