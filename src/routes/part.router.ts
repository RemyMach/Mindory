import express, {Request, Response} from "express";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import {body, validationResult} from "express-validator";
import fs from "fs";
import InvalidInput from "../errors/invalid-input";
import BasicError from "../errors/basicError";
import {DeckController} from "../controllers/deck.controller";

const partRouter = express.Router();

export {
    partRouter
}
