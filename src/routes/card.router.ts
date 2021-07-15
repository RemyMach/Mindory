import {body, oneOf, param, validationResult} from "express-validator";
import express, {Request, Response}from "express";
import {adminAuthMiddleware, authMiddleware} from "../middlewares/auth.middleware";
import InvalidInput from "../errors/invalid-input";
import multer, {Multer} from "multer";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import 'express-async-errors';
import fs from 'fs';
import BasicError from "../errors/basicError";
import {CardController} from "../controllers/card.controller";
import {CardInstance} from "../models/card.model";
import {CardRepository} from "../repositories/card.repository";
import {PartController} from "../controllers/part.controller";
import {UserRepository} from "../repositories/user.repository";
import {UserController} from "../controllers/user.controller";

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

cardRouter.get("/parts/:partId/pair",
    authMiddleware,
    [
        param('partId')
            .exists()
            .withMessage("une roomId valide est requise"),

    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        const userController = await UserController.getInstance();
        const user = await userController.authenticateUserWithToken(req.headers["authorization"]);
        if(user === undefined) {
            return res.status(401).end();
        }else if (user === null) {
            throw new BasicError("The user doesn't exist");
        }

        const { partId } = req.params;

        const partController = await PartController.getInstance();
        const part = await partController.part.findByPk(partId);
        if(part === null)
            throw new BasicError("the part doesn't exist");

        const partPlayedByAuthentifiedUsers = await partController.partIsPlayedByAuthentifiedUsers(part);
        if(!partPlayedByAuthentifiedUsers)
            return res.status(201).json({error: "no authentified users"}).end();

        const cardController = await CardController.getInstance();

        const cards = await cardController.getAllCardsValidFromThePart(part);
        const myPoints = await cardController.getAllPointsInAPartOfAUser(part, user);
        const oponnentPoints = cards.length / 2 - myPoints;


        return res.status(200).json({'Cards': cards, myPoints, oponnentPoints}).send().end();
    });

export {
    cardRouter
};
