"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_router_1 = require("./auth.router");
var user_router_1 = require("./user.router");
var passwordReset_router_1 = require("./passwordReset.router");
var card_router_1 = require("./card.router");
var deck_router_1 = require("./deck.router");
var part_router_1 = require("./part.router");
var shot_router_1 = require("./shot.router");
var room_router_1 = require("./room.router");
var role_router_1 = require("./role.router");
function buildRoutes(app) {
    app.use("/auth", auth_router_1.authRouter);
    app.use("/user", user_router_1.userRouter);
    app.use("/passwordReset", passwordReset_router_1.passwordResetRouter);
    app.use("/cards", card_router_1.cardRouter);
    app.use("/decks", deck_router_1.deckRouter);
    app.use("/parts", part_router_1.partRouter);
    app.use("/shots", shot_router_1.shotRouter);
    app.use("/rooms", room_router_1.roomRouter);
    app.use("/role", role_router_1.roleRouter);
    app.use(express_1.default.static('src/assets/upload'));
}
exports.buildRoutes = buildRoutes;
