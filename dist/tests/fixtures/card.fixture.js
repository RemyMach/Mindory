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
exports.CardFixture = void 0;
var models_1 = require("../../models");
var deck_fixture_1 = require("./deck.fixture");
var deckPython_fixture_1 = require("./Deck/deckPython.fixture");
var deckHTML_fixture_1 = require("./Deck/deckHTML.fixture");
var CardFixture = /** @class */ (function () {
    function CardFixture() {
    }
    ;
    CardFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (CardFixture.instance === undefined) {
                    CardFixture.instance = new CardFixture();
                }
                return [2 /*return*/, CardFixture.instance];
            });
        });
    };
    CardFixture.prototype.fillTable = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var manager, deckFixture, deckPython, deckHTML, _g, _h, _j, _k, _l, _m, _o, _p, _q, i, _r, _s, _t, i, _u, _v, _w;
            var _this = this;
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _x.sent();
                        return [4 /*yield*/, deck_fixture_1.DeckFixture.getInstance()];
                    case 2:
                        deckFixture = _x.sent();
                        deckPython = new deckPython_fixture_1.DeckPythonFixture();
                        deckHTML = new deckHTML_fixture_1.DeckHTMLFixture();
                        _h = (_g = Promise).all;
                        _j = this;
                        return [4 /*yield*/, manager.card.create({
                                image: "src/assets/upload/python.png"
                            })];
                    case 3:
                        _k = [
                            _j.card_no_associate_1 = _x.sent()
                        ];
                        _l = this;
                        return [4 /*yield*/, manager.card.create({
                                image: "src/assets/upload/python.png"
                            })];
                    case 4:
                        _k = _k.concat([
                            _l.card_no_associate_2 = _x.sent()
                        ]);
                        _m = this;
                        return [4 /*yield*/, manager.card.create({
                                text: "Python est un language interprété L'interpréteur Python, convertit le code source en bytecode(.pyc) puis l'exécute"
                            })];
                    case 5:
                        _k = _k.concat([
                            _m.card_associate_1 = _x.sent()
                        ]);
                        _o = this;
                        return [4 /*yield*/, manager.card.create({
                                text: "le processus d'execution d'un fichier Python"
                            })];
                    case 6:
                        _k = _k.concat([
                            _o.card_associate_2 = _x.sent()
                        ]);
                        _p = deckPython;
                        return [4 /*yield*/, Promise.all(deckPython.cards.map(function (card) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, manager.card.create(card)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 7:
                        _k = _k.concat([
                            _p.cardsInstance = _x.sent()
                        ]);
                        _q = deckHTML;
                        return [4 /*yield*/, Promise.all(deckHTML.cards.map(function (card) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, manager.card.create(card)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 8: return [4 /*yield*/, _h.apply(_g, [_k.concat([
                                _q.cardsInstance = _x.sent()
                            ])])];
                    case 9:
                        _x.sent();
                        return [4 /*yield*/, Promise.all([
                                (_a = this.card_no_associate_1) === null || _a === void 0 ? void 0 : _a.setDeck(deckFixture.deck_python),
                                (_b = this.card_no_associate_2) === null || _b === void 0 ? void 0 : _b.setDeck(deckFixture.deck_python),
                                (_c = this.card_associate_1) === null || _c === void 0 ? void 0 : _c.setDeck(deckFixture.deck_python),
                                (_d = this.card_associate_2) === null || _d === void 0 ? void 0 : _d.setDeck(deckFixture.deck_python),
                                (_e = this.card_associate_1) === null || _e === void 0 ? void 0 : _e.setCardAssociate(this.card_associate_2),
                                (_f = this.card_associate_2) === null || _f === void 0 ? void 0 : _f.setCardAssociate(this.card_associate_1)
                            ])];
                    case 10:
                        _x.sent();
                        i = 0;
                        _x.label = 11;
                    case 11:
                        if (!(i < deckPython.cardsInstance.length)) return [3 /*break*/, 16];
                        _s = (_r = Promise).all;
                        _t = [deckPython.cardsInstance[i].setDeck(deckFixture.deck_python),
                            deckPython.cardsInstance[i + 1].setDeck(deckFixture.deck_python)];
                        return [4 /*yield*/, deckPython.cardsInstance[i].setCardAssociate(deckPython.cardsInstance[i + 1])];
                    case 12:
                        _t = _t.concat([
                            _x.sent()
                        ]);
                        return [4 /*yield*/, deckPython.cardsInstance[i + 1].setCardAssociate(deckPython.cardsInstance[i])];
                    case 13: return [4 /*yield*/, _s.apply(_r, [_t.concat([
                                _x.sent()
                            ])])];
                    case 14:
                        _x.sent();
                        _x.label = 15;
                    case 15:
                        i += 2;
                        return [3 /*break*/, 11];
                    case 16:
                        i = 0;
                        _x.label = 17;
                    case 17:
                        if (!(i < deckPython.cardsInstance.length)) return [3 /*break*/, 22];
                        _v = (_u = Promise).all;
                        _w = [deckHTML.cardsInstance[i].setDeck(deckFixture.deck_html),
                            deckHTML.cardsInstance[i + 1].setDeck(deckFixture.deck_html)];
                        return [4 /*yield*/, deckHTML.cardsInstance[i].setCardAssociate(deckHTML.cardsInstance[i + 1])];
                    case 18:
                        _w = _w.concat([
                            _x.sent()
                        ]);
                        return [4 /*yield*/, deckHTML.cardsInstance[i + 1].setCardAssociate(deckHTML.cardsInstance[i])];
                    case 19: return [4 /*yield*/, _v.apply(_u, [_w.concat([
                                _x.sent()
                            ])])];
                    case 20:
                        _x.sent();
                        _x.label = 21;
                    case 21:
                        i += 2;
                        return [3 /*break*/, 17];
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    CardFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.card.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.card.destroy({
                                truncate: true,
                                force: true
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CardFixture;
}());
exports.CardFixture = CardFixture;
