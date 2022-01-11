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
exports.UserRepository = void 0;
var user_controller_1 = require("../controllers/user.controller");
var sequelize_1 = require("sequelize");
var part_controller_1 = require("../controllers/part.controller");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.getAllUsers = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.user.findAll({
                                attributes: ['name', 'surname', 'email'],
                                include: [{
                                        model: userController.role,
                                        attributes: ['label']
                                    }],
                                offset: offset,
                                limit: limit
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.getUserByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.user.findOne({
                                attributes: ['id', 'name', 'surname', 'email', 'username', 'password'],
                                include: [{
                                        model: userController.role,
                                        attributes: ['label']
                                    },
                                    {
                                        model: userController.session,
                                        attributes: [],
                                        where: {
                                            token: token
                                        }
                                    }],
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.user.findOne({
                                attributes: ['id', 'name', 'surname', 'email'],
                                where: {
                                    email: email
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.user.findOne({
                                attributes: ['id', 'name', 'surname', 'email'],
                                where: {
                                    id: id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.getCompleteUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.user.findOne({
                                attributes: ['id', 'name', 'surname', 'email'],
                                where: {
                                    id: id
                                },
                                include: [{
                                        model: userController.role,
                                        attributes: ['label']
                                    }]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.getUserByIdAndVerifyRole = function (id, role_labels) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _b.sent();
                        return [4 /*yield*/, userController.user.findOne({
                                attributes: ['id', 'name', 'surname', 'email'],
                                where: {
                                    id: id
                                },
                                include: [{
                                        model: userController.role,
                                        attributes: ['label'],
                                        where: (_a = {},
                                            _a[sequelize_1.Op.or] = { label: role_labels },
                                            _a)
                                    }]
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UserRepository.getUserEncryptedPassword = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var userController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.user.findOne({
                                attributes: ['password'],
                                include: [{
                                        model: userController.session,
                                        attributes: [],
                                        where: {
                                            token: token
                                        }
                                    }],
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.updateUser = function (token, props) {
        return __awaiter(this, void 0, void 0, function () {
            var userController, user, email_user, props_convert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.getUser(token)];
                    case 2:
                        user = _a.sent();
                        email_user = user === null || user === void 0 ? void 0 : user.email;
                        props_convert = JSON.parse(JSON.stringify(props));
                        if (email_user === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, userController.user.update(props_convert, {
                                where: {
                                    email: email_user
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, userController.getUser(token)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.updateUserpassword = function (user, new_password) {
        return __awaiter(this, void 0, void 0, function () {
            var userController, email_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        email_user = user === null || user === void 0 ? void 0 : user.email;
                        if (email_user === undefined || new_password === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, userController.user.update({
                                password: new_password
                            }, {
                                where: {
                                    email: email_user.toString().trim()
                                },
                                individualHooks: true
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, userController.getUserByEmail(email_user)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.deleteUser = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var userController, user, email_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                    case 1:
                        userController = _a.sent();
                        return [4 /*yield*/, userController.getUser(token)];
                    case 2:
                        user = _a.sent();
                        email_user = user === null || user === void 0 ? void 0 : user.email;
                        if (email_user === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, userController.user.destroy({
                                where: {
                                    email: email_user
                                },
                                individualHooks: true
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.userIsInPart = function (part, user) {
        return __awaiter(this, void 0, void 0, function () {
            var partController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, part_controller_1.PartController.getInstance()];
                    case 1:
                        partController = _a.sent();
                        return [4 /*yield*/, partController.user.findOne({
                                where: {
                                    id: user.id
                                },
                                include: [{
                                        required: true,
                                        model: partController.part,
                                        where: {
                                            id: part.id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
