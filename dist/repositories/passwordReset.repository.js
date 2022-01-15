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
exports.PasswordResetRepository = void 0;
var sequelize_1 = require("sequelize");
var passwordReset_controller_1 = require("../controllers/passwordReset.controller");
var PasswordResetRepository = /** @class */ (function () {
    function PasswordResetRepository() {
    }
    PasswordResetRepository.getAllPasswordResetForAUserExceptLastOne = function (user, passwordReset) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordController;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                    case 1:
                        passwordController = _b.sent();
                        return [4 /*yield*/, passwordController.passwordReset.findAll({
                                where: {
                                    id: (_a = {},
                                        _a[sequelize_1.Op.ne] = passwordReset.id,
                                        _a)
                                },
                                include: [{
                                        model: passwordController.user,
                                        where: {
                                            id: user.id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PasswordResetRepository.getAllPasswordResetForAUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                    case 1:
                        passwordController = _a.sent();
                        return [4 /*yield*/, passwordController.passwordReset.findAll({
                                include: [{
                                        model: passwordController.user,
                                        where: {
                                            id: user.id
                                        }
                                    }]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PasswordResetRepository.destroyPasswordReset = function (passwordResetForAUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, passwordResetForAUser_1, passwordReset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, passwordResetForAUser_1 = passwordResetForAUser;
                        _a.label = 1;
                    case 1:
                        if (!(_i < passwordResetForAUser_1.length)) return [3 /*break*/, 4];
                        passwordReset = passwordResetForAUser_1[_i];
                        return [4 /*yield*/, passwordReset.destroy()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PasswordResetRepository.getPasswordResetFromToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                    case 1:
                        passwordController = _a.sent();
                        return [4 /*yield*/, passwordController.passwordReset.findOne({
                                where: {
                                    token: token
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PasswordResetRepository;
}());
exports.PasswordResetRepository = PasswordResetRepository;
