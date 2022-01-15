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
exports.DeckController = void 0;
var models_1 = require("../models");
var deck_repository_1 = require("../repositories/deck.repository");
var basicError_1 = __importDefault(require("../errors/basicError"));
var shuffle_1 = require("../utils/array/shuffle");
var DeckController = /** @class */ (function () {
    function DeckController(user, card, deck) {
        this.user = user;
        this.card = card;
        this.deck = deck;
    }
    DeckController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, card, deck;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(DeckController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, card = _a.card, deck = _a.deck;
                        DeckController.instance = new DeckController(user, card, deck);
                        _b.label = 2;
                    case 2: return [2 /*return*/, DeckController.instance];
                }
            });
        });
    };
    DeckController.prototype.getADeckWithAllCards = function (deck) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, deck_repository_1.DeckRepository.getAllCardOfADeck(deck)];
            });
        });
    };
    DeckController.prototype.getADeckForPlaying = function (deck) {
        return __awaiter(this, void 0, void 0, function () {
            var NUMBER_CARD_FOR_A_GAME, deckCards, deckJson, cards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        NUMBER_CARD_FOR_A_GAME = 30;
                        return [4 /*yield*/, deck_repository_1.DeckRepository.getAllCardOfADeck(deck)];
                    case 1:
                        deckCards = _a.sent();
                        if (deckCards === null)
                            throw new basicError_1.default("the deck doesn't exist");
                        deckJson = JSON.parse(JSON.stringify(deckCards));
                        cards = deckJson["Cards"];
                        deckJson["Cards"] = this.selectNumberOfCard(cards, NUMBER_CARD_FOR_A_GAME);
                        return [2 /*return*/, deckJson];
                }
            });
        });
    };
    DeckController.prototype.selectNumberOfCard = function (cards, numberCard) {
        var result = [];
        var cardKeysInResult = {};
        (0, shuffle_1.shuffleArray)(cards);
        for (var i = 0; i < Object.keys(cards).length; i++) {
            if (cards[i]["cardAssociate"] !== null && !cardKeysInResult[cards[i]["id"]]) {
                result.push(cards[i]);
                result.push(this.getTheAssociateCard(i + 1, cards[i]["cardAssociate"]["id"], cards));
                cardKeysInResult[cards[i]['id']] = 1;
                cardKeysInResult[cards[i]["cardAssociate"]["id"]] = 1;
            }
            if (result.length >= numberCard)
                break;
        }
        (0, shuffle_1.shuffleArray)(result);
        return result;
    };
    DeckController.prototype.getTheAssociateCard = function (start, indexResearch, cards) {
        for (var i = start; i < Object.keys(cards).length; i++) {
            if (cards[i]["id"] == indexResearch) {
                return cards[i];
            }
        }
        return cards;
    };
    DeckController.prototype.filterDayByCardsNumber = function (decks, minCard) {
        return __awaiter(this, void 0, void 0, function () {
            var finalDecks, cards, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (minCard === 0)
                            return [2 /*return*/, decks];
                        finalDecks = [];
                        return [4 /*yield*/, Promise.all(decks.map(function (deck) { return deck.getCards(); }))];
                    case 1:
                        cards = _a.sent();
                        for (id in cards) {
                            if (cards[id].length >= minCard)
                                finalDecks.push(decks[id]);
                        }
                        return [2 /*return*/, finalDecks];
                }
            });
        });
    };
    DeckController.prototype.getDeckFromPartId = function (partId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deck_repository_1.DeckRepository.getDeckWithCardsFromAPart(partId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DeckController;
}());
exports.DeckController = DeckController;
