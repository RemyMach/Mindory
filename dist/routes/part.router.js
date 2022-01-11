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
exports.partRouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_middleware_1 = require("../middlewares/auth.middleware");
var express_validator_1 = require("express-validator");
var invalid_input_1 = __importDefault(require("../errors/invalid-input"));
var user_controller_1 = require("../controllers/user.controller");
var basicError_1 = __importDefault(require("../errors/basicError"));
var part_controller_1 = require("../controllers/part.controller");
var partRouter = express_1.default.Router();
exports.partRouter = partRouter;
partRouter.post("/", [
    (0, express_validator_1.body)("cardIds")
        .isArray({ min: 29, max: 31 })
        .withMessage("you have to fill an array of cards to begin the part"),
    (0, express_validator_1.body)("deckId")
        .isNumeric()
        .withMessage("you have to fill a valid id for a deck"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, _a, cardIds, deckId, partController, deck, part;
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
                    _a = req.body, cardIds = _a.cardIds, deckId = _a.deckId;
                    return [4 /*yield*/, part_controller_1.PartController.getInstance()];
                case 3:
                    partController = _b.sent();
                    return [4 /*yield*/, partController.deck.findByPk(deckId)];
                case 4:
                    deck = _b.sent();
                    if (deck === null)
                        throw new basicError_1.default("The deck doesn't exist");
                    return [4 /*yield*/, partController.createPart(deck, user, cardIds)];
                case 5:
                    part = _b.sent();
                    return [2 /*return*/, res.status(200).json(part).end()];
            }
        });
    });
});
partRouter.post("/existing", [
    (0, express_validator_1.body)("partId")
        .isNumeric()
        .withMessage("you have to fill a valid id for a part"),
    auth_middleware_1.authMiddleware
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, partId, partController, part, alreadyInIt;
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
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _a.sent();
                    if (user === undefined) {
                        return [2 /*return*/, res.status(401).end()];
                    }
                    else if (user === null) {
                        throw new basicError_1.default("The user doesn't exist");
                    }
                    partId = req.body.partId;
                    return [4 /*yield*/, part_controller_1.PartController.getInstance()];
                case 3:
                    partController = _a.sent();
                    return [4 /*yield*/, partController.part.findByPk(partId)];
                case 4:
                    part = _a.sent();
                    if (part === null)
                        throw new basicError_1.default("The part doesn't exist");
                    return [4 /*yield*/, partController.userIsAlreadyInPart(user, part)];
                case 5:
                    alreadyInIt = _a.sent();
                    if (alreadyInIt) {
                        return [2 /*return*/, res.status(200).json({ error: "User already in part" }).end()];
                    }
                    return [4 /*yield*/, partController.addAUserToAPart(user, part)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({}).end()];
            }
        });
    });
});
partRouter.get('/deck/:deckId/better', [
    auth_middleware_1.authMiddleware,
    (0, express_validator_1.param)('deckId')
        .isNumeric()
        .withMessage("you have to fill a valid id for a deck"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, deckId, partController, deck, parts;
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
                    return [4 /*yield*/, userController.authenticateUserWithToken(req.headers["authorization"])];
                case 2:
                    user = _a.sent();
                    if (user === undefined) {
                        return [2 /*return*/, res.status(401).end()];
                    }
                    else if (user === null) {
                        throw new basicError_1.default("The user doesn't exist");
                    }
                    deckId = req.params.deckId;
                    return [4 /*yield*/, part_controller_1.PartController.getInstance()];
                case 3:
                    partController = _a.sent();
                    return [4 /*yield*/, partController.deck.findByPk(deckId)];
                case 4:
                    deck = _a.sent();
                    if (!deck)
                        throw new basicError_1.default("The deckid is not valid");
                    return [4 /*yield*/, partController.getBetterPartOfADeckForAUser(deck, user)];
                case 5:
                    parts = _a.sent();
                    if (parts.length == 0)
                        return [2 /*return*/, res.status(200).json({ error: 'pas encore de partie dans ce deck' }).end()];
                    return [2 /*return*/, res.json(parts[0]).end()];
            }
        });
    });
});
