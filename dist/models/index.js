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
exports.SequelizeManager = void 0;
var sequelize_1 = require("sequelize");
var user_model_1 = __importDefault(require("./user.model"));
var session_model_1 = __importDefault(require("./session.model"));
var role_model_1 = __importDefault(require("./role.model"));
var passwordReset_model_1 = __importDefault(require("./passwordReset.model"));
var card_model_1 = __importDefault(require("./card.model"));
var deck_model_1 = __importDefault(require("./deck.model"));
var part_model_1 = __importDefault(require("./part.model"));
var shot_model_1 = __importDefault(require("./shot.model"));
var room_model_1 = __importDefault(require("./room.model"));
var userSocket_model_1 = __importDefault(require("./userSocket.model"));
var SequelizeManager = /** @class */ (function () {
    function SequelizeManager(props) {
        this.sequelize = props.sequelize;
        this.user = props.user;
        this.session = props.session;
        this.role = props.role;
        this.passwordReset = props.passwordReset;
        this.card = props.card;
        this.deck = props.deck;
        this.part = props.part;
        this.shot = props.shot;
        this.room = props.room;
        this.userSocket = props.userSocket;
    }
    SequelizeManager.getInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(SequelizeManager.instance === undefined)) return [3 /*break*/, 2];
                        _a = SequelizeManager;
                        return [4 /*yield*/, SequelizeManager.initialize()];
                    case 1:
                        _a.instance = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, SequelizeManager.instance];
                }
            });
        });
    };
    SequelizeManager.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, managerProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = new sequelize_1.Sequelize({
                            dialect: process.env.DB_DRIVER,
                            host: process.env.DB_HOST,
                            database: process.env.DB_NAME,
                            username: process.env.DB_USER,
                            password: process.env.DB_PASSWORD,
                            port: Number.parseInt(process.env.DB_PORT),
                            logging: false
                        });
                        return [4 /*yield*/, sequelize.authenticate()];
                    case 1:
                        _a.sent();
                        managerProps = {
                            sequelize: sequelize,
                            user: (0, user_model_1.default)(sequelize),
                            session: (0, session_model_1.default)(sequelize),
                            role: (0, role_model_1.default)(sequelize),
                            passwordReset: (0, passwordReset_model_1.default)(sequelize),
                            card: (0, card_model_1.default)(sequelize),
                            deck: (0, deck_model_1.default)(sequelize),
                            part: (0, part_model_1.default)(sequelize),
                            shot: (0, shot_model_1.default)(sequelize),
                            room: (0, room_model_1.default)(sequelize),
                            userSocket: (0, userSocket_model_1.default)(sequelize)
                        };
                        SequelizeManager.associate(managerProps);
                        return [4 /*yield*/, sequelize.sync({ force: (process.env.FORCE_RESET_DB === 'true') })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new SequelizeManager(managerProps)];
                }
            });
        });
    };
    SequelizeManager.associate = function (props) {
        props.user.hasMany(props.session); // User N Session
        props.session.belongsTo(props.user, { foreignKey: 'user_id' }); // Session 1 User
        props.role.hasMany(props.user, { onDelete: 'CASCADE' }); // User N Session
        props.user.belongsTo(props.role, { foreignKey: 'role_id' }); // Session 1 User
        props.user.hasMany(props.passwordReset, { onDelete: 'CASCADE' });
        props.passwordReset.belongsTo(props.user, { foreignKey: 'user_id' });
        props.card.belongsTo(props.card, { foreignKey: 'card_associate_id', as: 'cardAssociate' });
        props.deck.hasMany(props.card);
        props.card.belongsTo(props.deck, { foreignKey: 'deck_id' });
        props.part.belongsToMany(props.user, { through: 'UserPart', foreignKey: 'part_id' });
        props.user.belongsToMany(props.part, { through: 'UserPart', foreignKey: 'user_id' });
        props.part.belongsTo(props.deck, { foreignKey: 'deck_id' });
        props.deck.hasMany(props.part, { onDelete: 'CASCADE' });
        props.shot.belongsTo(props.part, { foreignKey: 'part_id' });
        props.part.hasMany(props.shot, { onDelete: 'CASCADE' });
        props.shot.belongsTo(props.user, { foreignKey: 'user_id' });
        props.user.hasMany(props.shot, { onDelete: 'CASCADE' });
        props.shot.belongsToMany(props.card, { through: 'CardShot', foreignKey: 'shot_id', onDelete: 'CASCADE' });
        props.card.belongsToMany(props.shot, { through: 'CardShot', foreignKey: 'card_id', onDelete: 'CASCADE' });
        props.card.belongsToMany(props.part, { through: 'CardPart', foreignKey: 'card_id', onDelete: 'CASCADE' });
        props.part.belongsToMany(props.card, { through: 'CardPart', foreignKey: 'part_id', onDelete: 'CASCADE' });
        props.room.hasMany(props.userSocket, { onDelete: 'CASCADE' });
        props.userSocket.belongsTo(props.room, { foreignKey: 'room_id' });
        props.room.belongsTo(props.part, { foreignKey: 'part_id' });
        props.part.hasMany(props.room, { onDelete: 'CASCADE' });
        props.user.hasMany(props.userSocket, { onDelete: 'CASCADE' });
        props.userSocket.belongsTo(props.user, { foreignKey: 'user_id' });
    };
    return SequelizeManager;
}());
exports.SequelizeManager = SequelizeManager;
