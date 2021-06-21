import express, {Request, Response} from "express";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import {body, validationResult} from "express-validator";
import fs from "fs";
import InvalidInput from "../errors/invalid-input";
import BasicError from "../errors/basicError";
import {DeckController} from "../controllers/deck.controller";

const partRouter = express.Router();

partRouter.post("/",
    adminAuthMiddleware,
    MulterConfigMiddleware.upload.single('image'),
    [
        body("title").exists().isString()
            .withMessage("you have to provide a valid title for the deck"),
    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            if(req.file)
                fs.unlink(req.file.path, () => {});
            throw new InvalidInput(errors);
        }

        let image: string | undefined;
        if(req.file)
            image = req.file.filename;
        if(image === undefined)
            throw new BasicError("you have to provide a valid file");

        const { title } = req.body;


        const deckController = await DeckController.getInstance();
        const deck = await deckController.deck.create({
            image,
            title
        });

        return res.status(201).json(deck).send().end();
    });
