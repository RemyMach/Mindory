import {Express} from "express";
import {authRouter} from "./auth.router";
import {userRouter} from "./user.router";
import {passwordResetRouter} from "./passwordReset.router";
import {cardRouter} from "./card.router";
import {deckRouter} from "./deck.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/passwordReset", passwordResetRouter);
    app.use("/cards", cardRouter);
    app.use("/decks", deckRouter);
}
