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
exports.SessionFixture = void 0;
var models_1 = require("../../models");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_fixture_1 = require("./user.fixture");
var SessionFixture = /** @class */ (function () {
    function SessionFixture() {
    }
    SessionFixture.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (SessionFixture.instance === undefined) {
                    SessionFixture.instance = new SessionFixture();
                }
                return [2 /*return*/, SessionFixture.instance];
            });
        });
    };
    ;
    SessionFixture.prototype.fillTable = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var manager, userFixture, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _r.sent();
                        return [4 /*yield*/, user_fixture_1.UserFixture.getInstance()];
                    case 2:
                        userFixture = _r.sent();
                        _h = (_g = Promise).all;
                        _j = this;
                        return [4 /*yield*/, manager.session.create({
                                token: (0, jsonwebtoken_1.sign)({ id: (_a = userFixture.user_admin_leonard) === null || _a === void 0 ? void 0 : _a.id.toString() }, process.env.JWT_SECRET)
                            })];
                    case 3:
                        _k = [
                            _j.session_user_admin = _r.sent()
                        ];
                        _l = this;
                        return [4 /*yield*/, manager.session.create({
                                token: (0, jsonwebtoken_1.sign)({ id: (_b = userFixture.user_pam) === null || _b === void 0 ? void 0 : _b.id.toString() }, process.env.JWT_SECRET)
                            })];
                    case 4:
                        _k = _k.concat([
                            _l.session_user_normal = _r.sent()
                        ]);
                        _m = this;
                        return [4 /*yield*/, manager.session.create({
                                token: (0, jsonwebtoken_1.sign)({ id: (_c = userFixture.user_jean) === null || _c === void 0 ? void 0 : _c.id.toString() }, process.env.JWT_SECRET)
                            })];
                    case 5: return [4 /*yield*/, _h.apply(_g, [_k.concat([
                                _m.session_user_normal_jean = _r.sent()
                            ])])];
                    case 6:
                        _r.sent();
                        _p = (_o = Promise).all;
                        return [4 /*yield*/, ((_d = userFixture.user_admin_leonard) === null || _d === void 0 ? void 0 : _d.addSession(this.session_user_admin))];
                    case 7:
                        _q = [
                            _r.sent()
                        ];
                        return [4 /*yield*/, ((_e = userFixture.user_pam) === null || _e === void 0 ? void 0 : _e.addSession(this.session_user_normal))];
                    case 8:
                        _q = _q.concat([
                            _r.sent()
                        ]);
                        return [4 /*yield*/, ((_f = userFixture.user_jean) === null || _f === void 0 ? void 0 : _f.addSession(this.session_user_normal_jean))];
                    case 9: return [4 /*yield*/, _p.apply(_o, [_q.concat([
                                _r.sent()
                            ])])];
                    case 10:
                        _r.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionFixture.prototype.destroyFieldsTable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.SequelizeManager.getInstance()];
                    case 1:
                        manager = _b.sent();
                        return [4 /*yield*/, ((_a = manager.user.sequelize) === null || _a === void 0 ? void 0 : _a.query('SET FOREIGN_KEY_CHECKS = 0'))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, manager.session.destroy({
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
    return SessionFixture;
}());
exports.SessionFixture = SessionFixture;
