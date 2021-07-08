import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {authMiddleware} from "../middlewares/auth.middleware";
import InvalidInput from "../errors/invalid-input";
import {UserController} from "../controllers/user.controller";
import BasicError from "../errors/basicError";
import {PartController} from "../controllers/part.controller";
import {UserInstance} from "../models/user.model";
import {RoomController} from "../controllers/room.controller";
import {DeckController} from "../controllers/deck.controller";
import {RoomRepository} from "../repositories/room.repository";



const roomRouter = express.Router();

roomRouter.post("/",[
    body("deckId")
        .isNumeric()
        .withMessage("you have to fill a valid id for a deck")
    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            throw new InvalidInput(errors);
        }

        const userController = await UserController.getInstance();

        let user: UserInstance | null | undefined = null;
        if(req.headers["authorization"]) {
            user = await userController.authenticateUserWithToken(req.headers["authorization"]);
            if(user === undefined) {
                return res.status(401).end();
            }else if (user === null) {
                throw new BasicError("The user doesn't exist");
            }
        }

        const { deckId} = req.body;
        const roomController = await RoomController.getInstance();
        const deckController = await DeckController.getInstance();
        const deck = await roomController.deck.findByPk(deckId);
        const partController = await PartController.getInstance();
        if(deck === null)
            throw new BasicError("The deck doesn't exist");

        const deckFinal = await deckController.getADeckForPlaying(deck);
        if(deckFinal === null)
            throw new BasicError("your deck doesn't have enough cards");

        const deckJson = JSON.parse(JSON.stringify(deckFinal));
        const cards = deckJson['Cards'];
        const cardIds = cards.map(((card: any ) => card['id']));
        const part = await partController.createPart(deck, user, cardIds);
        if(user !== null)
            await roomController.deleteAllRoomsForAUser(user);

        const room = await roomController.createRoom(part);

        return res.status(201).json({id: room.id, token: room.token, part: {id: part.id} }).end();
    });

export {
    roomRouter
}
