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
var mailing_1 = require("../../services/mailing");
var mock_email_api_1 = require("./mock-email-api");
var sendResetPasswordArgs = {
    toEmail: 'test@test.com',
    emailVerificationToken: 'whatever',
};
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mailing_1.EmailSender.resetEmailSenderInstance();
        return [2 /*return*/];
    });
}); });
it('should throw an error if the email server is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
    var emailSender;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                emailSender = mailing_1.EmailSender.getInstance();
                emailSender.deactivate();
                return [4 /*yield*/, expect(emailSender.sendResetPasswordEmail({ toEmail: 'test@test.com' })).rejects.toThrowError('EmailSender is not activate')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
it('should throw an error when sending an email if the email api is not set', function () { return __awaiter(void 0, void 0, void 0, function () {
    var emailSender;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                emailSender = mailing_1.EmailSender.getInstance();
                emailSender.activate();
                return [4 /*yield*/, expect(emailSender.sendResetPasswordEmail({ toEmail: 'test@test.com' })).rejects.toThrowError('EmailApi is not set')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
it('should send the reset password email if the sender is active and the EmailApi is set', function () { return __awaiter(void 0, void 0, void 0, function () {
    var emailSender, mockEmailApi, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                emailSender = mailing_1.EmailSender.getInstance();
                mockEmailApi = new mock_email_api_1.MockEmailApi();
                emailSender.activate();
                emailSender.setEmailApi(mockEmailApi);
                return [4 /*yield*/, emailSender.sendResetPasswordEmail(sendResetPasswordArgs)];
            case 1:
                res = _a.sent();
                expect(res.toEmail).toEqual('test@test.com');
                expect(mock_email_api_1.mockResetPasswordEmail).toHaveBeenCalledTimes(1);
                return [2 /*return*/];
        }
    });
}); });
