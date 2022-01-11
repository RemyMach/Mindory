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
var fixtures_1 = require("./fixtures");
var app_1 = __importDefault(require("../app"));
var session_fixture_1 = require("./fixtures/session.fixture");
var supertest_1 = __importDefault(require("supertest"));
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
describe('Determine the auth routes behavior', function () {
    describe('Test the creation of a user', function () {
        it('should return 400 because the username is taken in the db', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/subscribe')
                            .send({
                            name: 'remy',
                            surname: "pomme",
                            email: 'remy@example.com',
                            password: "azertyuiop",
                            username: "jean"
                        }).expect(400)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because the email is taken in the db', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/subscribe')
                            .send({
                            name: 'remy',
                            surname: "pomme",
                            email: 'margaux.prodic@gmail.com',
                            password: "azertyuiop",
                            username: "jean"
                        }).expect(400)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should  work because the user doesn\'t exist in the db', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/subscribe')
                            .send({
                            name: 'remy',
                            surname: "pomme",
                            email: 'remy@example.com',
                            password: "azertyuiop",
                            username: "remac"
                        }).expect(201)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not work because a param is missing in the request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/subscribe')
                            .send({
                            name: 'remy',
                            surname: "pomme",
                            password: "azertyuiop",
                            username: "tom"
                        }).expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test the login of a user", function () {
        it('should return 400 because the password is not correct', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/login')
                            .send({
                            email: "rachel@notime.com",
                            password: "azertyuiopo"
                        }).expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 200 work because good email and password', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/login')
                            .send({
                            email: "rachel@notime.com",
                            password: "azertyuiop"
                        }).expect(200)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because bad username doesn\'t exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/login')
                            .send({
                            password: "azertyuiop",
                            email: "jean261"
                        }).expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because email is not fill', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/login')
                            .send({
                            password: "azertyuiop",
                        }).expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 because password is not fill', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/auth/login')
                            .send({
                            password: "azertyuiop",
                        }).expect(400)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test the logout of a user", function () {
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
        it('should return 200 because the token correspond to a user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _b.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).delete('/auth/logout')
                                .set('Authorization', "Bearer " + ((_a = sessionFixture.session_user_admin) === null || _a === void 0 ? void 0 : _a.token))
                                .send().expect(200, { "message": "the token has been deleted" })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 403 because the token doesn\'t exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).delete('/auth/logout')
                                .set('Authorization', "Bearer fdsfsdfsd")
                                .send().expect(403)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 401 because the token is doesn\'t fill', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sessionFixture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, session_fixture_1.SessionFixture.getInstance()];
                    case 1:
                        sessionFixture = _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).delete('/auth/logout')
                                .send().expect(401)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
