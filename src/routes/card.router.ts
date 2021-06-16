import {body, oneOf, validationResult} from "express-validator";
import express, {Request, Response}from "express";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import InvalidInput from "../errors/invalid-input";
import multer, {Multer} from "multer";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import 'express-async-errors';
import fs from 'fs';
import BasicError from "../errors/basicError";
import {CardController} from "../controllers/card.controller";
import {CardInstance} from "../models/card.model";
import {CardRepository} from "../repositories/card.repository";

const cardRouter = express.Router();


cardRouter.post("/",
    adminAuthMiddleware,
    MulterConfigMiddleware.upload.single('image'),
    [
        body("deckId").exists().isNumeric()
            .withMessage("you have to provide the deck associate to the card"),
        body("cardAssociateId").exists().isNumeric().optional()
            .withMessage("you have to filled a valid other card id"),

    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        let image: string | undefined;
        if(req.file)
            image = req.file.filename;

        const { text, deckId, cardAssociateId } = req.body;
        console.log(text, deckId, cardAssociateId)
        console.log(req.file)
        if(image === undefined && text === undefined)
            throw new BasicError("you have to provide text or file");

        if(image !== undefined && text != undefined) {
            fs.unlink(req.file.path, () => {});
            throw new BasicError("you can't provide image and text choose one");
        }

        const cardController = await CardController.getInstance();
        const deck = await cardController.deck.findByPk(deckId);
        if(deck === null)
            throw new BasicError("the Deck doesn't exist");

        let cardAssociate: CardInstance |  null = null;
        if(cardAssociateId) {
            cardAssociate = await cardController.getCardIfAvailableAndInTheSameDeck(cardAssociateId, deck);
            if(cardAssociate === null)
                throw new BasicError("the card associate doesn't exist in this deck or is already paired with an other card");
        }

        const card = await cardController.createCard({image, text, deck, cardAssociate});


        return res.status(201).json({text: card?.text, image: card?.image}).send().end();
});


export {
    cardRouter
};
