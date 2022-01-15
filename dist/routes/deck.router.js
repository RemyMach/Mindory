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
exports.deckRouter = void 0;
var express_validator_1 = require("express-validator");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var multerConfig_middleware_1 = require("../middlewares/multerConfig.middleware");
var express_1 = __importDefault(require("express"));
var basicError_1 = __importDefault(require("../errors/basicError"));
var fs_1 = __importDefault(require("fs"));
var deck_controller_1 = require("../controllers/deck.controller");
var invalid_input_1 = __importDefault(require("../errors/invalid-input"));
var deck_repository_1 = require("../repositories/deck.repository");
var card_repository_1 = require("../repositories/card.repository");
var sequelize_1 = require("sequelize");
var deckRouter = express_1.default.Router();
exports.deckRouter = deckRouter;
deckRouter.post("/", auth_middleware_1.adminAuthMiddleware, multerConfig_middleware_1.MulterConfigMiddleware.upload.single('image'), [
    (0, express_validator_1.body)("title").exists().isString()
        .withMessage("you have to provide a valid title for the deck"),
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, image, title, deckController, deck;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        if (req.file)
                            fs_1.default.unlink(req.file.path, function () {
                            });
                        throw new invalid_input_1.default(errors);
                    }
                    if (req.file)
                        image = req.file.filename;
                    if (image === undefined)
                        throw new basicError_1.default("you have to provide a valid file");
                    title = req.body.title;
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 1:
                    deckController = _a.sent();
                    return [4 /*yield*/, deckController.deck.create({
                            image: image,
                            title: title
                        })];
                case 2:
                    deck = _a.sent();
                    return [2 /*return*/, res.status(201).json(deck).send().end()];
            }
        });
    });
});
deckRouter.get("/all", [
    (0, express_validator_1.query)("offset").isNumeric().optional()
        .withMessage("you have to provide a valid offset"),
    (0, express_validator_1.query)("limit").isNumeric().isInt({ lt: 25 }).optional()
        .withMessage("you have to provide a valid limit"),
    (0, express_validator_1.query)("minCard").isNumeric().isInt().optional()
        .withMessage("you have to provide a valid minCard number")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, offset, limit, minCard, deckController, decks, finalDecks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    offset = req.query.offset ? Number.parseInt(req.query.offset) : 0;
                    limit = req.query.limit ? Number.parseInt(req.query.limit) : 25;
                    minCard = req.query.minCard ? Number.parseInt(req.query.minCard) : 0;
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 1:
                    deckController = _a.sent();
                    return [4 /*yield*/, deckController.deck.findAll({
                            attributes: ["id", "title", "image", [sequelize_1.Sequelize.literal('(SELECT COUNT(*) FROM Card C WHERE C.deck_id=Deck.id)'), "count"]],
                            offset: offset,
                            limit: limit,
                        })];
                case 2:
                    decks = _a.sent();
                    return [4 /*yield*/, deckController.filterDayByCardsNumber(decks, minCard)];
                case 3:
                    finalDecks = _a.sent();
                    return [2 /*return*/, res.status(200).json(finalDecks).end()];
            }
        });
    });
});
deckRouter.get("/:deckId", [
    (0, express_validator_1.param)("deckId").exists()
        .withMessage("you have to provide a valid deckId")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, deckId, deckController, deck, deckFinal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    deckId = req.params.deckId;
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 1:
                    deckController = _a.sent();
                    return [4 /*yield*/, deckController.deck.findByPk(deckId)];
                case 2:
                    deck = _a.sent();
                    if (deck === null)
                        throw new basicError_1.default("the Deck doesn't exist");
                    return [4 /*yield*/, deckController.getADeckWithAllCards(deck)];
                case 3:
                    deckFinal = _a.sent();
                    return [2 /*return*/, res.status(200).json(deckFinal).send().end()];
            }
        });
    });
});
deckRouter.get("/play/:deckId", [
    (0, express_validator_1.param)("deckId").exists()
        .withMessage("you have to provide a valid deckId")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, deckId, deckController, deck, deckFinal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    deckId = req.params.deckId;
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 1:
                    deckController = _a.sent();
                    return [4 /*yield*/, deckController.deck.findByPk(deckId)];
                case 2:
                    deck = _a.sent();
                    if (deck === null)
                        throw new basicError_1.default("the Deck doesn't exist");
                    return [4 /*yield*/, deckController.getADeckForPlaying(deck)];
                case 3:
                    deckFinal = _a.sent();
                    if (deckFinal === null)
                        throw new basicError_1.default("your deck doesn't have enough cards");
                    // const partController = await PartController.getInstance();
                    //await partController.registerAllCardOfThePart(deckFinal);
                    return [2 /*return*/, res.status(200).json(deckFinal).end()];
            }
        });
    });
});
deckRouter.get("/part/:partId", [
    (0, express_validator_1.param)("partId")
        .isNumeric()
        .withMessage("you have to provide a valid partId")
], function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, partId, deckController, deck;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    partId = Number.parseInt(req.params.partId);
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 1:
                    deckController = _a.sent();
                    return [4 /*yield*/, deckController.getDeckFromPartId(partId)];
                case 2:
                    deck = _a.sent();
                    if (deck === null) {
                        throw new basicError_1.default("the part doesn't exist");
                    }
                    return [2 /*return*/, res.status(200).json(deck).end()];
            }
        });
    });
});
deckRouter.delete("/:deckId", [
    (0, express_validator_1.param)("deckId").exists()
        .withMessage("you have to provide a valid deckId")
], auth_middleware_1.adminAuthMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, deckId, deckController, deck, json, _a, _b, _c, _d, _i, _e, card;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req).array();
                    if (errors.length > 0) {
                        throw new invalid_input_1.default(errors);
                    }
                    deckId = req.params.deckId;
                    return [4 /*yield*/, deck_controller_1.DeckController.getInstance()];
                case 1:
                    deckController = _f.sent();
                    return [4 /*yield*/, deckController.deck.findByPk(deckId)];
                case 2:
                    deck = _f.sent();
                    if (deck === null)
                        throw new basicError_1.default("the Deck doesn't exist");
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, deck_repository_1.DeckRepository.getAllCardOfADeck(deck)];
                case 3:
                    json = _b.apply(_a, [_d.apply(_c, [_f.sent()])]);
                    _i = 0, _e = json.Cards;
                    _f.label = 4;
                case 4:
                    if (!(_i < _e.length)) return [3 /*break*/, 7];
                    card = _e[_i];
                    return [4 /*yield*/, card_repository_1.CardRepository.deleteCardById(card.id)];
                case 5:
                    _f.sent();
                    _f.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, deck_repository_1.DeckRepository.deleteDeckById(Number.parseInt(deckId))];
                case 8:
                    _f.sent();
                    return [2 /*return*/, res.status(200).json('Le deck a bien été supprimé').end()];
            }
        });
    });
});
