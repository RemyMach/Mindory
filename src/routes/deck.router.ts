import {body, param, query, validationResult} from "express-validator";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import express, {Request, Response} from "express";
import BasicError from "../errors/basicError";
import fs from "fs";
import {CardController} from "../controllers/card.controller";
import {CardInstance} from "../models/card.model";
import {DeckController} from "../controllers/deck.controller";
import InvalidInput from "../errors/invalid-input";
import {PartController} from "../controllers/part.controller";
import {Op, Sequelize} from "sequelize";

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

deckRouter.get("/all",[
        query("offset").isNumeric().optional()
            .withMessage("you have to provide a valid offset"),
        query("limit").isNumeric().isInt({lt: 25}).optional()
            .withMessage("you have to provide a valid limit"),
        query("minCard").isNumeric().isInt().optional()
            .withMessage("you have to provide a valid minCard number")
    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 25;
        const minCard = req.query.minCard ? Number.parseInt(req.query.minCard as string) : 0;

        const deckController = await DeckController.getInstance();
        const decks = await deckController.deck.findAll({
            attributes: ["id", "title", "image"],
            offset,
            limit,
        });

        const finalDecks = await deckController.filterDayByCardsNumber(decks, minCard);

        return res.status(200).json(finalDecks).end();
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
        if(deckFinal === null)
            throw new BasicError("your deck doesn't have enough cards");
        const partController = await PartController.getInstance();
        //await partController.registerAllCardOfThePart(deckFinal);
        return res.status(200).json(deckFinal).send().end();
});

deckRouter.get("/part/:partId",[
        param("partId")
            .isNumeric()
            .withMessage("you have to provide a valid partId")
    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        const partId  = Number.parseInt(req.params.partId);
        const deckController = await DeckController.getInstance();
        const deck = await deckController.getDeckFromPartId(partId)
        if(deck === null)
            throw new BasicError("the part doesn't exist");

        return res.status(200).json(deck).send().end();
});

export {
    deckRouter
};
