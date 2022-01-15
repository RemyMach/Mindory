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
exports.PasswordResetController = void 0;
var models_1 = require("../models");
var passwordReset_repository_1 = require("../repositories/passwordReset.repository");
var password_reset_1 = require("../utils/password_reset/password_reset");
var PasswordResetController = /** @class */ (function () {
    function PasswordResetController(user, passwordReset) {
        this.user = user;
        this.passwordReset = passwordReset;
    }
    PasswordResetController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, passwordReset;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(PasswordResetController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, passwordReset = _a.passwordReset;
                        PasswordResetController.instance = new PasswordResetController(user, passwordReset);
                        _b.label = 2;
                    case 2: return [2 /*return*/, PasswordResetController.instance];
                }
            });
        });
    };
    PasswordResetController.prototype.getUserWithFromResetPasswordToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordResetInstance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, passwordReset_repository_1.PasswordResetRepository.getPasswordResetFromToken(token)];
                    case 1:
                        passwordResetInstance = _b.sent();
                        console.log(" ");
                        console.log(passwordResetInstance);
                        if (!passwordResetInstance)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, passwordResetInstance.getUser()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PasswordResetController.prototype.createPasswordReset = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordReset, token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        token = (0, password_reset_1.generateToken)();
                        return [4 /*yield*/, this.passwordReset.create({
                                token: token
                            })];
                    case 1:
                        passwordReset = _b.sent();
                        return [4 /*yield*/, passwordReset.setUser(user)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.deleteOtherTokenBeforeTheLastOne(user, passwordReset)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/, passwordReset];
                }
            });
        });
    };
    PasswordResetController.prototype.deleteOtherTokenBeforeTheLastOne = function (user, passwordReset) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordResetInstances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passwordReset_repository_1.PasswordResetRepository.getAllPasswordResetForAUserExceptLastOne(user, passwordReset)];
                    case 1:
                        passwordResetInstances = _a.sent();
                        if (!passwordResetInstances)
                            return [2 /*return*/];
                        return [4 /*yield*/, passwordReset_repository_1.PasswordResetRepository.destroyPasswordReset(passwordResetInstances)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PasswordResetController.prototype.deleteAllTokenForAUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordResetInstances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, passwordReset_repository_1.PasswordResetRepository.getAllPasswordResetForAUser(user)];
                    case 1:
                        passwordResetInstances = _a.sent();
                        if (!passwordResetInstances)
                            return [2 /*return*/];
                        return [4 /*yield*/, passwordReset_repository_1.PasswordResetRepository.destroyPasswordReset(passwordResetInstances)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PasswordResetController;
}());
exports.PasswordResetController = PasswordResetController;