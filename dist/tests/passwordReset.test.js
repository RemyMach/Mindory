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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var user_repository_1 = require("../repositories/user.repository");
var mock_email_api_1 = require("./email/mock-email-api");
var mailing_1 = require("../services/mailing");
var models_1 = require("../models");
jest.setTimeout(10000);
beforeEach(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var emailSender, mockEmailApi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, fixtures_1.destroyTablesElement)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, fixtures_1.fillTables)()];
            case 2:
                _a.sent();
                emailSender = mailing_1.EmailSender.getInstance();
                mockEmailApi = new mock_email_api_1.MockEmailApi();
                emailSender.activate();
                emailSender.setEmailApi(mockEmailApi);
                done();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("on passe ici");
                return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
            case 1:
                (_a.sent()).sequelize.close();
                console.log("connection fermé");
                done();
                return [2 /*return*/];
        }
    });
}); });
describe('Determine the password Reset routes behavior', function () {
    describe('Test the reset of a password', function () {
        it('should return 202 because the email doesn\'t exist in the db but the user doesn\'t have to know that', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/passwordReset')
                            .send({
                            email: 'pomme@pomui.com',
                        }).expect(202)];
                    case 1:
                        response = _a.sent();
                        console.log("test");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 202 because the email exist but the user doesn\'t have to know it', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var user, _a, response, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, user_repository_1.UserRepository.getUserByEmail('eric@gmail.com')];
                    case 1:
                        user = _c.sent();
                        _a = expect;
                        return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.getPassword_Resets())];
                    case 2:
                        _a.apply(void 0, [_c.sent()]).toHaveLength(0);
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/passwordReset')
                                .send({
                                email: 'eric@gmail.com',
                            }).expect(202)];
                    case 3:
                        response = _c.sent();
                        _b = expect;
                        return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.getPassword_Resets())];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).toHaveLength(1);
                        console.log("test 1");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 202 when the email is not fill because the user doesn\'t have to know how to do this request', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/passwordReset')
                            .send({}).expect(202)];
                    case 1:
                        response = _a.sent();
                        console.log("test 2");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 202 and add 2 token but always have one for the user , the latest add', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var user, passwordResetRequestOne, passwordResetRequestTwo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/passwordReset')
                            .send({
                            email: 'eric@gmail.com',
                        }).expect(202)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, user_repository_1.UserRepository.getUserByEmail('eric@gmail.com')];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.getPassword_Resets())];
                    case 3:
                        passwordResetRequestOne = _a.sent();
                        expect(passwordResetRequestOne).toHaveLength(1);
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/passwordReset')
                                .send({
                                email: 'eric@gmail.com',
                            }).expect(202)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.getPassword_Resets())];
                    case 5:
                        passwordResetRequestTwo = _a.sent();
                        expect(passwordResetRequestTwo).toHaveLength(1);
                        //the first token has been deleted when the second has been add
                        expect(passwordResetRequestOne).not.toEqual(passwordResetRequestTwo);
                        console.log("test 3");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
