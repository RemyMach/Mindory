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
exports.destroyTablesElement = exports.fillTables = void 0;
var user_fixture_1 = require("./user.fixture");
var role_fixture_1 = require("./role.fixture");
var session_fixture_1 = require("./session.fixture");
var passwordReset_fixture_1 = require("./passwordReset.fixture");
var deck_fixture_1 = require("./deck.fixture");
var card_fixture_1 = require("./card.fixture");
var partPython_1 = require("./Part/partPython");
var shotPartOne_fixture_1 = require("./Shot/shotPartOne.fixture");
var shotPartTwo_fixture_1 = require("./Shot/shotPartTwo.fixture");
var shotPartThree_fixture_1 = require("./Shot/shotPartThree.fixture");
var partPythonTwoPlayer_fixture_1 = require("./Part/partPythonTwoPlayer.fixture");
var shot2PlayerPartOne_fixture_1 = require("./Shot/shot2PlayerPartOne.fixture");
var shot2PlayerPartTwo_fixture_1 = require("./Shot/shot2PlayerPartTwo.fixture");
var roomPython_fixture_1 = require("./Room/roomPython.fixture");
var userSocketPython_fixture_1 = require("./Room/userSocketPython.fixture");
function fillTables() {
    return __awaiter(this, void 0, void 0, function () {
        var roleFixture, userFixture, sessionFixture, deckFixture, cardFixture, partPythonFixture, partPythonTwoPlayerFixture, shotPartOneFixture, shotPartTwoFixture, shotPartThreeFixture, shot2playerPartOneFixture, shot2PlayerPartTwoFixture, roomPythonFixture, userSocketPythonFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, role_fixture_1.RoleFixture.getInstance()];
                case 1:
                    roleFixture = _a.sent();
                    return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                case 2:
                    userFixture = _a.sent();
                    return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                case 3:
                    sessionFixture = _a.sent();
                    return [4 /*yield*/, deck_fixture_1.DeckFixture.getInstance()];
                case 4:
                    deckFixture = _a.sent();
                    return [4 /*yield*/, card_fixture_1.CardFixture.getInstance()];
                case 5:
                    cardFixture = _a.sent();
                    return [4 /*yield*/, partPython_1.PartPythonFixture.getInstance()];
                case 6:
                    partPythonFixture = _a.sent();
                    return [4 /*yield*/, partPythonTwoPlayer_fixture_1.PartPythonTwoPlayerFixture.getInstance()];
                case 7:
                    partPythonTwoPlayerFixture = _a.sent();
                    return [4 /*yield*/, shotPartOne_fixture_1.ShotPartOneFixture.getInstance()];
                case 8:
                    shotPartOneFixture = _a.sent();
                    return [4 /*yield*/, shotPartTwo_fixture_1.ShotPartTwoFixture.getInstance()];
                case 9:
                    shotPartTwoFixture = _a.sent();
                    return [4 /*yield*/, shotPartThree_fixture_1.ShotPartThreeFixture.getInstance()];
                case 10:
                    shotPartThreeFixture = _a.sent();
                    return [4 /*yield*/, shot2PlayerPartOne_fixture_1.Shot2playerPartOneFixture.getInstance()];
                case 11:
                    shot2playerPartOneFixture = _a.sent();
                    return [4 /*yield*/, shot2PlayerPartTwo_fixture_1.Shot2PlayerPartTwoFixture.getInstance()];
                case 12:
                    shot2PlayerPartTwoFixture = _a.sent();
                    return [4 /*yield*/, roomPython_fixture_1.RoomPythonFixture.getInstance()];
                case 13:
                    roomPythonFixture = _a.sent();
                    return [4 /*yield*/, userSocketPython_fixture_1.UserSocketPythonFixture.getInstance()];
                case 14:
                    userSocketPythonFixture = _a.sent();
                    return [4 /*yield*/, roleFixture.fillTable()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, userFixture.fillTable()];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, sessionFixture.fillTable()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, deckFixture.fillTable()];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, cardFixture.fillTable()];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, partPythonFixture.fillTable()];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, shotPartOneFixture.fillTable()];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, shotPartTwoFixture.fillTable()];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, shotPartThreeFixture.fillTable()];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, partPythonTwoPlayerFixture.fillTable()];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, shot2playerPartOneFixture.fillTable()];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, shot2PlayerPartTwoFixture.fillTable()];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, roomPythonFixture.fillTable()];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, userSocketPythonFixture.fillTable()];
                case 28:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fillTables = fillTables;
function destroyTablesElement() {
    return __awaiter(this, void 0, void 0, function () {
        var roleFixture, userFixture, sessionFixture, passwordResetFixture, deckFixture, cardFixture, partPythonFixture, shotPartOneFixture, roomPythonFixture, userSocketPythonFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, role_fixture_1.RoleFixture.getInstance()];
                case 1:
                    roleFixture = _a.sent();
                    return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                case 2:
                    userFixture = _a.sent();
                    return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                case 3:
                    sessionFixture = _a.sent();
                    return [4 /*yield*/, passwordReset_fixture_1.PasswordResetFixture.getInstance()];
                case 4:
                    passwordResetFixture = _a.sent();
                    return [4 /*yield*/, deck_fixture_1.DeckFixture.getInstance()];
                case 5:
                    deckFixture = _a.sent();
                    return [4 /*yield*/, card_fixture_1.CardFixture.getInstance()];
                case 6:
                    cardFixture = _a.sent();
                    return [4 /*yield*/, partPython_1.PartPythonFixture.getInstance()];
                case 7:
                    partPythonFixture = _a.sent();
                    return [4 /*yield*/, shotPartOne_fixture_1.ShotPartOneFixture.getInstance()];
                case 8:
                    shotPartOneFixture = _a.sent();
                    return [4 /*yield*/, roomPython_fixture_1.RoomPythonFixture.getInstance()];
                case 9:
                    roomPythonFixture = _a.sent();
                    return [4 /*yield*/, userSocketPython_fixture_1.UserSocketPythonFixture.getInstance()];
                case 10:
                    userSocketPythonFixture = _a.sent();
                    return [4 /*yield*/, sessionFixture.destroyFieldsTable()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, passwordResetFixture.destroyFieldsTable()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, userFixture.destroyFieldsTable()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, roleFixture.destroyFieldsTable()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, deckFixture.destroyFieldsTable()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, cardFixture.destroyFieldsTable()];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, roomPythonFixture.destroyFieldsTable()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, partPythonFixture.destroyFieldsTable()];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, shotPartOneFixture.destroyFieldsTable()];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, userSocketPythonFixture.destroyFieldsTable()];
                case 20:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.destroyTablesElement = destroyTablesElement;
