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
exports.passwordResetRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var passwordReset_controller_1 = require("../controllers/passwordReset.controller");
var express_validator_1 = require("express-validator");
var invalid_input_1 = __importDefault(require("../errors/invalid-input"));
require("express-async-errors");
var mailing_1 = require("../services/mailing");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var passwordResetRouter = express_1.default.Router();
exports.passwordResetRouter = passwordResetRouter;
passwordResetRouter.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, userController, user, passwordController, passwordReset, emailSender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    if (email === undefined) {
                        res.status(202).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    return [4 /*yield*/, userController.getUserByEmail(email)];
                case 2:
                    user = _a.sent();
                    if (user === null)
                        return [2 /*return*/, res.status(202).end()];
                    return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                case 3:
                    passwordController = _a.sent();
                    return [4 /*yield*/, passwordController.createPasswordReset(user)];
                case 4:
                    passwordReset = _a.sent();
                    if (!passwordReset)
                        return [2 /*return*/, res.status(202).end()];
                    return [4 /*yield*/, passwordController.deleteOtherTokenBeforeTheLastOne(user, passwordReset)];
                case 5:
                    _a.sent();
                    emailSender = mailing_1.EmailSender.getInstance();
                    return [4 /*yield*/, emailSender.sendResetPasswordEmail({
                            toEmail: process.env.MAIL_RECEIVER,
                            tokenGenerate: passwordReset.token
                        })];
                case 6:
                    _a.sent();
                    res.status(202).end();
                    return [2 /*return*/];
            }
        });
    });
});
passwordResetRouter.get("/:token", [
    (0, express_validator_1.param)('token')
        .trim()
        .isLength({ min: 64, max: 255 })
        .withMessage('le token de verification n\'est pas valide'),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, token, passwordResetController, userVerificationToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    token = req.params.token;
                    return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                case 1:
                    passwordResetController = _a.sent();
                    return [4 /*yield*/, passwordResetController.getUserWithFromResetPasswordToken(token)];
                case 2:
                    userVerificationToken = _a.sent();
                    if (!userVerificationToken) {
                        errors.push({
                            location: 'body',
                            value: req.body.token,
                            param: 'token',
                            msg: 'le token de verification n\'est pas valide',
                        });
                        throw new invalid_input_1.default(errors);
                    }
                    return [2 /*return*/, res.status(200).end()];
            }
        });
    });
});
passwordResetRouter.put("/", [
    (0, express_validator_1.body)('token')
        .trim()
        .isLength({ min: 64, max: 255 })
        .withMessage('le token de verification n\'est pas valide'),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 8, max: 50 })
        .withMessage('le mot de passe doit-être entre 8 et 50 caractères'),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, token, password, passwordResetController, userVerificationToken, userController, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    _a = req.body, token = _a.token, password = _a.password;
                    return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                case 1:
                    passwordResetController = _c.sent();
                    return [4 /*yield*/, passwordResetController.getUserWithFromResetPasswordToken(token)];
                case 2:
                    userVerificationToken = _c.sent();
                    if (!userVerificationToken) {
                        errors.push({
                            location: 'body',
                            value: req.body.token,
                            param: 'token',
                            msg: 'le token de verification n\'est pas valide',
                        });
                        throw new invalid_input_1.default(errors);
                    }
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 3:
                    userController = _c.sent();
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, userController.resetPassword(userVerificationToken, password)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, passwordResetController.deleteAllTokenForAUser(userVerificationToken)];
                case 6:
                    _c.sent();
                    return [2 /*return*/, res.status(200).end()];
                case 7:
                    _b = _c.sent();
                    return [2 /*return*/, res.status(400).end()];
                case 8: return [2 /*return*/];
            }
        });
    });
});
passwordResetRouter.put("/change", [
    (0, express_validator_1.body)('oldPassword')
        .trim()
        .isLength({ min: 8, max: 50 })
        .withMessage('le mot de passe doit-être entre 8 et 50 caractères'),
    (0, express_validator_1.body)('newPassword')
        .trim()
        .isLength({ min: 8, max: 50 })
        .withMessage('le mot de passe doit-être entre 8 et 50 caractères')
], auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, _a, oldPassword, newPassword, passwordResetController, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _c.sent();
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _c.sent();
                    if (user === undefined || user === null)
                        throw new Error();
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    return [4 /*yield*/, passwordReset_controller_1.PasswordResetController.getInstance()];
                case 3:
                    passwordResetController = _c.sent();
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, userController.changePassword(user, newPassword, oldPassword)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, passwordResetController.deleteAllTokenForAUser(user)];
                case 6:
                    _c.sent();
                    return [2 /*return*/, res.status(200).end()];
                case 7:
                    _b = _c.sent();
                    return [2 /*return*/, res.status(400).end()];
                case 8: return [2 /*return*/];
            }
        });
    });
});
