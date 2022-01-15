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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var fixtures_1 = require("./fixtures");
var session_fixture_1 = require("./fixtures/session.fixture");
beforeEach(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, fixtures_1.destroyTablesElement)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, fixtures_1.fillTables)()];
            case 2:
                _a.sent();
                done();
                return [2 /*return*/];
        }
    });
}); });
describe("Determine the card routes behavior", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sessionFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                case 1:
                    sessionFixture = _a.sent();
                    return [4 /*yield*/, sessionFixture.destroyFieldsTable()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sessionFixture.fillTable()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("Test to uploading a file", function () {
        var filePath = process.env.FILE_DIRECTORY + "python.png";
        it('should return 400 because deck doesn\'t exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .attach("image", filePath)
                                .field("deckId", 1200)
                                .expect(400)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because text and image are not filled', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .field("deckId", 1200)
                                .expect(400)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because deckId is not fill', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .attach("image", filePath)
                                .field("deckId", 1200)
                                .expect(400)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because cardAssociate have already a card associate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .attach("image", filePath)
                                .field("deckId", 1)
                                .field("cardAssociateId", 3)
                                .expect(400)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a card with no card Associate and an image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .attach("image", filePath)
                                .field("deckId", 1)
                                .expect(201)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a card with a card Associate and an image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .attach("image", filePath)
                                .field("deckId", 1)
                                .field("cardAssociateId", 2)
                                .expect(201)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a card with no card associate and a text', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .field("text", "je suis un test")
                                .field("deckId", 1)
                                .field("cardAssociateId", 2)
                                .expect(201)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a card with a card Associate and a text', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/cards")
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .field("text", "je suis un test")
                                .field("deckId", 1)
                                .field("cardAssociateId", 2)
                                .expect(201)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});