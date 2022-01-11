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
exports.roomRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var invalid_input_1 = __importDefault(require("../errors/invalid-input"));
var user_controller_1 = require("../controllers/user.controller");
var basicError_1 = __importDefault(require("../errors/basicError"));
var part_controller_1 = require("../controllers/part.controller");
var room_controller_1 = require("../controllers/room.controller");
var deck_controller_1 = require("../controllers/deck.controller");
var roomRouter = express_1.default.Router();
exports.roomRouter = roomRouter;
roomRouter.post("/", [
    (0, express_validator_1.body)("deckId")
        .isNumeric()
        .withMessage("you have to fill a valid id for a deck")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, deckId, roomController, deckController, deck, partController, deckFinal, deckJson, cards, cardIds, part, room;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    user = null;
                    if (!req.headers["authorization"]) return [3 /*break*/, 3];
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _a.sent();
                    if (user === undefined) {
                        return [2 /*return*/, res.status(401).end()];
                    }
                    else if (user === null) {
                        throw new basicError_1.default("The user doesn't exist");
                    }
                    _a.label = 3;
                case 3:
                    deckId = req.body.deckId;
                    return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
                case 4:
                    roomController = _a.sent();
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 5:
                    deckController = _a.sent();
                    return [4 /*yield*/, roomController.deck.findByPk(deckId)];
                case 6:
                    deck = _a.sent();
                    return [4 /*yield*/, part_controller_1.PartController.getInstance()];
                case 7:
                    partController = _a.sent();
                    if (deck === null)
                        throw new basicError_1.default("The deck doesn't exist");
                    return [4 /*yield*/, deckController.getADeckForPlaying(deck)];
                case 8:
                    deckFinal = _a.sent();
                    if (deckFinal === null)
                        throw new basicError_1.default("your deck doesn't have enough cards");
                    deckJson = JSON.parse(JSON.stringify(deckFinal));
                    cards = deckJson['Cards'];
                    cardIds = cards.map((function (card) { return card['id']; }));
                    return [4 /*yield*/, partController.createPart(deck, user, cardIds)];
                case 9:
                    part = _a.sent();
                    if (!(user !== null)) return [3 /*break*/, 11];
                    return [4 /*yield*/, roomController.deleteAllRoomsForAUser(user)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [4 /*yield*/, roomController.createRoom(part)];
                case 12:
                    room = _a.sent();
                    return [2 /*return*/, res.status(201).json({ id: room.id, token: room.token, part: { id: part.id } }).end()];
            }
        });
    });
});
roomRouter.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userController, user, token, roomController, finalRoom, room, part;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    user = null;
                    if (!req.headers["authorization"]) return [3 /*break*/, 3];
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _a.sent();
                    if (user === undefined) {
                        return [2 /*return*/, res.status(401).end()];
                    }
                    else if (user === null) {
                        throw new basicError_1.default("The user doesn't exist");
                    }
                    _a.label = 3;
                case 3:
                    token = req.query.token;
                    return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
                case 4:
                    roomController = _a.sent();
                    if (!user) return [3 /*break*/, 6];
                    return [4 /*yield*/, roomController.getRoomUpForAUser(user)];
                case 5:
                    room = _a.sent();
                    if (room == null) {
                        return [2 /*return*/, res.status(200).json({}).end()];
                    }
                    finalRoom = room[0];
                    return [3 /*break*/, 8];
                case 6:
                    if (token === undefined)
                        return [2 /*return*/, res.status(200).json({}).end()];
                    return [4 /*yield*/, roomController.getRoomByToken(token)];
                case 7:
                    finalRoom = _a.sent();
                    if (finalRoom == null) {
                        return [2 /*return*/, res.status(200).json({}).end()];
                    }
                    _a.label = 8;
                case 8: return [4 /*yield*/, finalRoom.getPart()];
                case 9:
                    part = _a.sent();
                    return [2 /*return*/, res.status(200).json({ id: finalRoom.id, token: finalRoom.token, keyword: finalRoom.keyword, part: { id: part.id } }).end()];
            }
        });
    });
});
roomRouter.get('/token/:token', [
    (0, express_validator_1.param)('token')
        .exists()
        .withMessage("un token est requis"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, tokenUser, user, token, roomController, room, roomAvailable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _a.sent();
                    tokenUser = req.headers["authorization"];
                    if (!tokenUser) return [3 /*break*/, 3];
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _a.sent();
                    if (user === undefined) {
                        return [2 /*return*/, res.status(401).end()];
                    }
                    else if (user === null) {
                        throw new basicError_1.default("The user doesn't exist");
                    }
                    _a.label = 3;
                case 3:
                    token = req.params.token;
                    return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
                case 4:
                    roomController = _a.sent();
                    return [4 /*yield*/, roomController.getRoomByToken(token)];
                case 5:
                    room = _a.sent();
                    if (room == null)
                        throw new basicError_1.default("The token is not valid or to many people use it1");
                    return [4 /*yield*/, roomController.roomIsAvailableForANewUserOrUserIsInTheRoom(room, user)];
                case 6:
                    roomAvailable = _a.sent();
                    if (!roomAvailable)
                        throw new basicError_1.default("The token is not valid or to many people use it2");
                    return [2 /*return*/, res.status(200).json({ is_available: roomAvailable }).end()];
            }
        });
    });
});
roomRouter.put('/', [
    auth_middleware_1.authMiddleware,
    (0, express_validator_1.body)('keyWord')
        .exists()
        .isLength({ min: 5, max: 40 })
        .withMessage("keyWord est requis avec un minimum de 5 carractères et un maximum de 50"),
    (0, express_validator_1.body)('roomId')
        .isNumeric()
        .withMessage("Vous devez transmettre une room valide")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, _a, keyWord, roomId, roomController, room, keyOrdIsUnique;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    return [4 /*yield*/, user_controller_1.UserController.getInstance()];
                case 1:
                    userController = _b.sent();
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _b.sent();
                    if (user === undefined) {
                        return [2 /*return*/, res.status(401).end()];
                    }
                    else if (user === null) {
                        throw new basicError_1.default("The user doesn't exist");
                    }
                    _a = req.body, keyWord = _a.keyWord, roomId = _a.roomId;
                    return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
                case 3:
                    roomController = _b.sent();
                    return [4 /*yield*/, roomController.room.findByPk(roomId)];
                case 4:
                    room = _b.sent();
                    if (room === null) {
                        throw new basicError_1.default("The room doesn't exist");
                    }
                    return [4 /*yield*/, roomController.keyWordIsUniqueInRoomUp(keyWord)];
                case 5:
                    keyOrdIsUnique = _b.sent();
                    if (!keyOrdIsUnique)
                        throw new basicError_1.default("The keyWord is not available");
                    return [4 /*yield*/, roomController.updateRoomKeyWord(room, keyWord)];
                case 6:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({}).end()];
            }
        });
    });
});
roomRouter.get('/keyWord/:keyWord', [
    (0, express_validator_1.param)('keyWord')
        .exists()
        .isLength({ min: 5, max: 40 })
        .withMessage("vous devez transmettre un keyword valide"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, keyWord, roomController, room;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    keyWord = req.params.keyWord;
                    return [4 /*yield*/, room_controller_1.RoomController.getInstance()];
                case 1:
                    roomController = _a.sent();
                    return [4 /*yield*/, roomController.getARoomByKeyword(keyWord)];
                case 2:
                    room = _a.sent();
                    if (!room)
                        throw new basicError_1.default("The room doesn't exist");
                    return [2 /*return*/, res.status(200).json(room).end()];
            }
        });
    });
});
