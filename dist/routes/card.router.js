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
exports.cardRouter = void 0;
var express_validator_1 = require("express-validator");
var express_1 = __importDefault(require("express"));
var auth_middleware_1 = require("../middlewares/auth.middleware");
var invalid_input_1 = __importDefault(require("../errors/invalid-input"));
var multerConfig_middleware_1 = require("../middlewares/multerConfig.middleware");
require("express-async-errors");
var fs_1 = __importDefault(require("fs"));
var basicError_1 = __importDefault(require("../errors/basicError"));
var card_controller_1 = require("../controllers/card.controller");
var card_repository_1 = require("../repositories/card.repository");
var part_controller_1 = require("../controllers/part.controller");
var user_controller_1 = require("../controllers/user.controller");
var cardRouter = express_1.default.Router();
exports.cardRouter = cardRouter;
cardRouter.post("/", auth_middleware_1.adminAuthMiddleware, multerConfig_middleware_1.MulterConfigMiddleware.upload.single('image'), [
    (0, express_validator_1.body)("deckId").exists().isNumeric()
        .withMessage("you have to provide the deck associate to the card"),
    (0, express_validator_1.body)("cardAssociateId").exists().isNumeric().optional()
        .withMessage("you have to filled a valid other card id"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, image, _a, text, deckId, cardAssociateId, cardController, deck, cardAssociate, card;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    if (req.file)
                        image = req.file.filename;
                    _a = req.body, text = _a.text, deckId = _a.deckId, cardAssociateId = _a.cardAssociateId;
                    if (image === undefined && text === undefined)
                        throw new basicError_1.default("you have to provide text or file");
                    if (image !== undefined && text != undefined) {
                        fs_1.default.unlink(req.file.path, function () { });
                        throw new basicError_1.default("you can't provide image and text choose one");
                    }
                    return [4 /*yield*/, card_controller_1.CardController.getInstance()];
                case 1:
                    cardController = _b.sent();
                    return [4 /*yield*/, cardController.deck.findByPk(deckId)];
                case 2:
                    deck = _b.sent();
                    if (deck === null)
                        throw new basicError_1.default("the Deck doesn't exist");
                    cardAssociate = null;
                    if (!cardAssociateId) return [3 /*break*/, 4];
                    return [4 /*yield*/, cardController.getCardIfAvailableAndInTheSameDeck(cardAssociateId, deck)];
                case 3:
                    cardAssociate = _b.sent();
                    if (cardAssociate === null)
                        throw new basicError_1.default("the card associate doesn't exist in this deck or is already paired with an other card");
                    _b.label = 4;
                case 4: return [4 /*yield*/, cardController.createCard({ image: image, text: text, deck: deck, cardAssociate: cardAssociate })];
                case 5:
                    card = _b.sent();
                    return [2 /*return*/, res.status(201).json({ id: card === null || card === void 0 ? void 0 : card.id, text: card === null || card === void 0 ? void 0 : card.text, image: card === null || card === void 0 ? void 0 : card.image }).end()];
            }
        });
    });
});
cardRouter.delete("/:cardId", [
    (0, express_validator_1.param)("cardId").exists()
        .withMessage("you have to provide a valid deckId")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, cardId, cardController, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    cardId = req.params.cardId;
                    return [4 /*yield*/, card_controller_1.CardController.getInstance()];
                case 1:
                    cardController = _a.sent();
                    return [4 /*yield*/, cardController.card.findByPk(cardId)];
                case 2:
                    card = _a.sent();
                    if (card === null)
                        throw new basicError_1.default("the Card doesn't exist");
                    return [4 /*yield*/, card_repository_1.CardRepository.deleteCardById(Number.parseInt(cardId))];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json('La carte a bien été supprimée').end()];
            }
        });
    });
});
cardRouter.get("/parts/:partId/pair", auth_middleware_1.authMiddleware, [
    (0, express_validator_1.param)('partId')
        .exists()
        .withMessage("une roomId valide est requise"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userController, user, partId, partController, part, partPlayedByAuthentifiedUsers, cardController, cards, myPoints, oponnentPoints;
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
                    partId = req.params.partId;
                    return [4 /*yield*/, part_controller_1.PartController.getInstance()];
                case 3:
                    partController = _a.sent();
                    return [4 /*yield*/, partController.part.findByPk(partId)];
                case 4:
                    part = _a.sent();
                    if (part === null)
                        throw new basicError_1.default("the part doesn't exist");
                    return [4 /*yield*/, partController.partIsPlayedByAuthentifiedUsers(part)];
                case 5:
                    partPlayedByAuthentifiedUsers = _a.sent();
                    if (!partPlayedByAuthentifiedUsers)
                        return [2 /*return*/, res.status(201).json({ error: "no authentified users" }).end()];
                    return [4 /*yield*/, card_controller_1.CardController.getInstance()];
                case 6:
                    cardController = _a.sent();
                    return [4 /*yield*/, cardController.getAllCardsValidFromThePart(part)];
                case 7:
                    cards = _a.sent();
                    cards = cards.map(function (card) { return card.id; });
                    return [4 /*yield*/, cardController.getAllPointsInAPartOfAUser(part, user)];
                case 8:
                    myPoints = _a.sent();
                    oponnentPoints = cards.length / 2 - myPoints;
                    return [2 /*return*/, res.status(200).json({ cards: cards, myPoints: myPoints, oponnentPoints: oponnentPoints }).end()];
            }
        });
    });
});
