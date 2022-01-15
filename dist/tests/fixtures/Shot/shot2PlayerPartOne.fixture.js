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
exports.Shot2playerPartOneFixture = void 0;
var getCardsFromIds_1 = require("../../../utils/cards/getCardsFromIds");
var models_1 = require("../../../models");
var user_fixture_1 = require("../user.fixture");
var partPythonTwoPlayer_fixture_1 = require("../Part/partPythonTwoPlayer.fixture");
var Shot2playerPartOneFixture = /** @class */ (function () {
    function Shot2playerPartOneFixture() {
    }
    Shot2playerPartOneFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (Shot2playerPartOneFixture.instance === undefined) {
                    Shot2playerPartOneFixture.instance = new Shot2playerPartOneFixture();
                }
                return [2 /*return*/, Shot2playerPartOneFixture.instance];
            });
        });
    };
    ;
    Shot2playerPartOneFixture.prototype.fillTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manager, userFixture, partPythonTwoPlayerFixture, cards, i, shot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _a.sent();
                        return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                    case 2:
                        userFixture = _a.sent();
                        return [4 /*yield*/, partPythonTwoPlayer_fixture_1.PartPythonTwoPlayerFixture.getInstance()];
                    case 3:
                        partPythonTwoPlayerFixture = _a.sent();
                        return [4 /*yield*/, (0, getCardsFromIds_1.getCardOfAPLayingDeck)([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32])];
                    case 4:
                        cards = _a.sent();
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < cards.length - 4)) return [3 /*break*/, 9];
                        return [4 /*yield*/, manager.shot.create({ isValid: 1, time: i })];
                    case 6:
                        shot = _a.sent();
                        if (i % 4 == 0)
                            shot.setUser(userFixture.user_jean);
                        else
                            shot.setUser(userFixture.user_admin_rachel);
                        return [4 /*yield*/, Promise.all([
                                shot.setPart(partPythonTwoPlayerFixture.part_1),
                                shot.addCard(cards[i]),
                                shot.addCard(cards[i + 1])
                            ])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i += 2;
                        return [3 /*break*/, 5];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Shot2playerPartOneFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.shot.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.shot.destroy({
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
    return Shot2playerPartOneFixture;
}());
exports.Shot2playerPartOneFixture = Shot2playerPartOneFixture;
