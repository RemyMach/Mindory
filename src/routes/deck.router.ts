import {body, param, validationResult} from "express-validator";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import express, {Request, Response} from "express";
import BasicError from "../errors/basicError";
import fs from "fs";
import {CardController} from "../controllers/card.controller";
import {CardInstance} from "../models/card.model";
import {DeckController} from "../controllers/deck.controller";
import InvalidInput from "../errors/invalid-input";

const deckRouter = express.Router();

deckRouter.post("/",
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

deckRouter.get("/:deckId",[
        param("deckId").exists()
            .withMessage("you have to provide a valid deckId")
    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        const { deckId } = req.params;

        const deckController = await DeckController.getInstance();
        const deck = await deckController.deck.findByPk(deckId);
        if(deck === null)
            throw new BasicError("the Deck doesn't exist");

        const deckFinal = await deckController.getADeckWithAllCards(deck);

        return res.status(200).json(deckFinal).send().end();
});

deckRouter.get("/play/:deckId",[
        param("deckId").exists()
            .withMessage("you have to provide a valid deckId")
    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        const { deckId } = req.params;
        const deckController = await DeckController.getInstance();
        const deck = await deckController.deck.findByPk(deckId);
        if(deck === null)
            throw new BasicError("the Deck doesn't exist");

        const deckFinal = await deckController.getADeckForPlaying(deck);
        return res.status(200).json(deckFinal).send().end();
    });

export {
    deckRouter
};
