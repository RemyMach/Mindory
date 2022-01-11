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
exports.PartController = void 0;
var models_1 = require("../models");
var getCardsFromIds_1 = require("../utils/cards/getCardsFromIds");
var part_repository_1 = require("../repositories/part.repository");
var card_repository_1 = require("../repositories/card.repository");
var user_repository_1 = require("../repositories/user.repository");
var PartController = /** @class */ (function () {
    function PartController(user, card, deck, shot, part) {
        this.user = user;
        this.card = card;
        this.deck = deck;
        this.shot = shot;
        this.part = part;
    }
    PartController.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, card, deck, shot, part;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(PartController.instance === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        _a = _b.sent(), user = _a.user, card = _a.card, deck = _a.deck, shot = _a.shot, part = _a.part;
                        PartController.instance = new PartController(user, card, deck, shot, part);
                        _b.label = 2;
                    case 2: return [2 /*return*/, PartController.instance];
                }
            });
        });
    };
    PartController.prototype.createPart = function (deck, user, cardIds, cardsInstance) {
        if (cardIds === void 0) { cardIds = null; }
        if (cardsInstance === void 0) { cardsInstance = null; }
        return __awaiter(this, void 0, void 0, function () {
            var part, cards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.part.create()];
                    case 1:
                        part = _a.sent();
                        if (!cardIds) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, getCardsFromIds_1.getCardOfAPLayingDeck)(cardIds)];
                    case 2:
                        cards = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (cardsInstance !== null)
                            cards = cardsInstance;
                        _a.label = 4;
                    case 4:
                        if (!(user !== null)) return [3 /*break*/, 6];
                        return [4 /*yield*/, part.addUser(user)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, part.setDeck(deck)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, Promise.all([
                                cards.map(function (card) {
                                    if (card != null)
                                        part.addCard(card);
                                })
                            ])];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, part];
                }
            });
        });
    };
    PartController.prototype.partIsEnd = function (part) {
        return __awaiter(this, void 0, void 0, function () {
            var cardsPlay, cardsOfThePart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, card_repository_1.CardRepository.getAllCardsPlayDuringThePart(part)];
                    case 1:
                        cardsPlay = _a.sent();
                        if (cardsPlay === null || cardsPlay.length !== 30)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, card_repository_1.CardRepository.getAllCardsOfAPart(part)];
                    case 2:
                        cardsOfThePart = _a.sent();
                        if (cardsOfThePart === null)
                            return [2 /*return*/, false];
                        return [2 /*return*/, this.cardsPlayAreTheSameThanCardsPart(cardsPlay, cardsOfThePart)];
                }
            });
        });
    };
    PartController.prototype.cardsPlayAreTheSameThanCardsPart = function (cardsPlay, cardsOfThePart) {
        var cardsPlayIds = new Map();
        for (var _i = 0, cardsPlay_1 = cardsPlay; _i < cardsPlay_1.length; _i++) {
            var card = cardsPlay_1[_i];
            if (!cardsPlayIds.has(card.id))
                cardsPlayIds.set(card.id, 1);
            else
                cardsPlayIds.set(card.id, cardsPlayIds.get(card.id) + 1);
        }
        if (cardsPlayIds.size !== 30)
            return false;
        for (var _a = 0, cardsOfThePart_1 = cardsOfThePart; _a < cardsOfThePart_1.length; _a++) {
            var card = cardsOfThePart_1[_a];
            if (cardsPlayIds.has(card.id))
                cardsPlayIds.set(card.id, cardsPlayIds.get(card.id) - 1);
        }
        for (var _b = 0, _c = Array.from(cardsPlayIds.values()); _b < _c.length; _b++) {
            var value = _c[_b];
            if (value != 0)
                return false;
        }
        return true;
    };
    PartController.prototype.registerTheEndOfThePart = function (part, time) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, part.getUsers()];
                    case 1:
                        users = _a.sent();
                        if (!(users.length < 2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, part.update({ time: time })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PartController.prototype.addAUserToAPart = function (user, part) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, part.addUser(user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PartController.prototype.userIsAlreadyInPart = function (user, part) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.userIsInPart(part, user)];
                    case 1: return [2 /*return*/, (_a.sent()) !== null];
                }
            });
        });
    };
    PartController.prototype.partIsPlayedByAuthentifiedUsers = function (part) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, part.getUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.length == 2];
                }
            });
        });
    };
    PartController.prototype.getBetterPartOfADeckForAUser = function (deck, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, part_repository_1.PartRepository.getBetterPartOfADeckForAUser(deck, user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PartController;
}());
exports.PartController = PartController;
