import express, {Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {body, param, validationResult} from "express-validator";
import InvalidInput from "../errors/invalid-input";
import {UserController} from "../controllers/user.controller";
import BasicError from "../errors/basicError";
import {PartController} from "../controllers/part.controller";


const partRouter = express.Router();

partRouter.post("/", [
        body("cardIds")
            .isArray({min: 29, max: 31})
            .withMessage("you have to fill an array of cards to begin the part"),
        body("deckId")
            .isNumeric()
            .withMessage("you have to fill a valid id for a deck"),
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

        const { cardIds, deckId} = req.body;
        const partController = await PartController.getInstance();
        const deck = await partController.deck.findByPk(deckId);
        if(deck === null)
            throw new BasicError("The deck doesn't exist");

        const part = await partController.createPart(deck, user, cardIds);

        return res.status(200).json(part).end();
});

partRouter.post("/existing", [
        body("partId")
            .isNumeric()
            .withMessage("you have to fill a valid id for a part"),
        authMiddleware
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

        const { partId } = req.body;
        const partController = await PartController.getInstance();
        const part = await partController.part.findByPk(partId);
        if(part === null)
            throw new BasicError("The part doesn't exist");

        const alreadyInIt = await partController.userIsAlreadyInPart(user, part);
        if(alreadyInIt) {
            return res.status(200).json({error: "User already in part"}).end();
        }
        await partController.addAUserToAPart(user, part);

        return res.status(200).json({}).end();
    });

partRouter.get('/deck/:deckId/better', [
        authMiddleware,
        param('deckId')
            .isNumeric()
            .withMessage("you have to fill a valid id for a deck"),
    ], async function(req: Request, res: Response) {
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

        const { deckId } = req.params;
        const partController = await PartController.getInstance();
        const deck = await partController.deck.findByPk(deckId);
        if(!deck)
            throw new BasicError("The deckid is not valid");
        const parts = await partController.getBetterPartOfADeckForAUser(deck, user);
        if(parts.length == 0)
            return res.status(200).json({error: 'pas encore de partie dans ce deck'}).end();
        return res.json(parts[0]).end();
});

export {
    partRouter
}
