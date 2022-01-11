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
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controllers/auth.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
require("express-async-errors");
var express_validator_1 = require("express-validator");
var invalid_input_1 = __importDefault(require("../errors/invalid-input"));
var authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/subscribe", [
    (0, express_validator_1.body)("name")
        .exists()
        .isString()
        .withMessage("un nom est requis"),
    (0, express_validator_1.body)("surname")
        .exists()
        .isString()
        .withMessage("un nom est requis"),
    (0, express_validator_1.body)("username")
        .exists()
        .isString()
        .withMessage("un username est requis"),
    (0, express_validator_1.body)("email")
        .exists()
        .isString()
        .withMessage("un mail est requis"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, _a, name, surname, password, username, email, authController, user, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    _a = req.body, name = _a.name, surname = _a.surname, password = _a.password, username = _a.username, email = _a.email;
                    return [4 /*yield*/, auth_controller_1.AuthController.getInstance()];
                case 1:
                    authController = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, authController.subscribe({
                            name: name,
                            surname: surname,
                            email: email,
                            password: password,
                            username: username
                        })];
                case 3:
                    user = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(400).send(e_1.message).end()];
                case 5:
                    if (user === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    res.status(201);
                    res.json({
                        name: name,
                        surname: surname,
                        email: email,
                        username: username
                    });
                    return [2 /*return*/];
            }
        });
    });
});
authRouter.post("/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, authController, session, validationError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    password = req.body.password;
                    if (email === undefined || password === undefined) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, auth_controller_1.AuthController.getInstance()];
                case 1:
                    authController = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, authController.log({ email: email, password: password })];
                case 3:
                    session = _a.sent();
                    if (session === null)
                        return [2 /*return*/, res.status(400).end()];
                    return [2 /*return*/, res.status(200).json({ token: session.token }).end()];
                case 4:
                    validationError_1 = _a.sent();
                    res.status(400).end();
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
});
authRouter.delete("/logout", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var auth, token, authController, session, validationError_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auth = req.headers["authorization"];
                    if (auth === undefined) {
                        res.status(403).end();
                        return [2 /*return*/];
                    }
                    token = auth.replace('Bearer ', '');
                    return [4 /*yield*/, auth_controller_1.AuthController.getInstance()];
                case 1:
                    authController = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, authController.deleteSession(token)];
                case 3:
                    session = _a.sent();
                    if (session === null) {
                        res.status(400).end();
                        return [2 /*return*/];
                    }
                    else {
                        res.status(200).json({ "message": "the token has been deleted" }).end();
                    }
                    return [3 /*break*/, 5];
                case 4:
                    validationError_2 = _a.sent();
                    res.status(400).end();
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
});
authRouter.get("/token", auth_middleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, res.status(200).end()];
        });
    });
});
authRouter.get("/token/role/admin", auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, res.status(200).end()];
        });
    });
});
