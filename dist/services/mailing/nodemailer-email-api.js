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
exports.NodemailerEmailApi = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var NodemailerEmailApi = /** @class */ (function () {
    function NodemailerEmailApi() {
        this.buildEmailVerificationLink = function (args) {
            var emailVerificationToken = args.emailVerificationToken;
            // TODO: this url will change once we integrate kubernetes in our application
            return "http://localhost:3000/passwordReset/" + emailVerificationToken;
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: 'localhost',
            port: 1025,
            auth: {
                user: 'project.1',
                pass: 'secret.1'
            }
        });
    }
    NodemailerEmailApi.prototype.sendEmail = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var toEmail, subject, textBody, htmlBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toEmail = args.toEmail, subject = args.subject, textBody = args.textBody, htmlBody = args.htmlBody;
                        return [4 /*yield*/, this.transporter.sendMail({
                                from: 'Unsocial App <noreply@unsocial.app>',
                                to: toEmail,
                                subject: subject,
                                text: textBody,
                                html: htmlBody,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NodemailerEmailApi.prototype.sendResetPasswordEmail = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var toEmail, tokenGenerate, emailVerificationLink, subject, textBody, htmlBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toEmail = args.toEmail, tokenGenerate = args.tokenGenerate;
                        if (!tokenGenerate) {
                            return [2 /*return*/, {
                                    toEmail: toEmail,
                                    status: 'error'
                                }];
                        }
                        emailVerificationLink = this.buildEmailVerificationLink({
                            emailVerificationToken: tokenGenerate,
                        });
                        subject = 'Hi it\'s Mindory! Password reset';
                        textBody = this.buildResetPasswordEmailTextBody({
                            emailVerificationLink: emailVerificationLink,
                        });
                        htmlBody = this.buildResetPasswordEmailHtmlBody({
                            emailVerificationLink: emailVerificationLink,
                        });
                        return [4 /*yield*/, this.sendEmail({ toEmail: toEmail, subject: subject, textBody: textBody, htmlBody: htmlBody })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                toEmail: toEmail,
                                status: 'success'
                            }];
                }
            });
        });
    };
    NodemailerEmailApi.prototype.buildResetPasswordEmailTextBody = function (args) {
        var emailVerificationLink = args.emailVerificationLink;
        return "Welcome to Mindory, the coolest app to play and learn! Please click on the link below (or copy it to your browser) to reset your password. " + emailVerificationLink;
    };
    NodemailerEmailApi.prototype.buildResetPasswordEmailHtmlBody = function (args) {
        var emailVerificationLink = args.emailVerificationLink;
        return "\n        <h1>Welcome to Mindory</h1>\n        <br/>\n        the coolest app to play and learn!\n        <br/>\n        <br/>\n        Please click on the link below (or copy it to your browser) to reset your password:\n        <br/>\n        <br/>\n        <a href=\"" + emailVerificationLink + "\">" + emailVerificationLink + "</a>";
    };
    return NodemailerEmailApi;
}());
exports.NodemailerEmailApi = NodemailerEmailApi;
