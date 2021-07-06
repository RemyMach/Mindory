import express, {Express} from "express";
import {authRouter} from "./auth.router";
import {userRouter} from "./user.router";
import {passwordResetRouter} from "./passwordReset.router";
import {cardRouter} from "./card.router";
import {deckRouter} from "./deck.router";
import {partRouter} from "./part.router";
import {shotRouter} from "./shot.router";
import {roleRouter} from "./role.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/passwordReset", passwordResetRouter);
    app.use("/cards", cardRouter);
    app.use("/decks", deckRouter);
    app.use("/parts", partRouter);
    app.use("/shots", shotRouter);
    app.use("/role", roleRouter);
    app.use(express.static('src/assets/upload'));
}
