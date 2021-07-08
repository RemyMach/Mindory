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

roomRouter.get('/', [
        authMiddleware
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
    const roomController = await RoomController.getInstance();
    const room = await roomController.getRoomUpForAUser(user);
    if(room == null) {
        return res.status(200).json({}).end();
    }
    const part = await room[0].getPart();
    return res.status(200).json({id: room[0].id, token: room[0].token, keyword: room[0].keyword, part: {id: part.id} }).end();
});

roomRouter.put('/', [
    authMiddleware,
    body('keyWord')
        .exists()
        .isLength({min: 5, max: 40})
        .withMessage("keyWord est requis avec un minimum de 5 carractères et un maximum de 50"),
    body('roomId')
        .isNumeric()
        .withMessage("Vous devez transmettre une room valide")
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

    const { keyWord, roomId} = req.body;
    const roomController = await RoomController.getInstance();
    const room = await roomController.room.findByPk(roomId);
    if(room == null) {
        throw new BasicError("The room doesn't exist");
    }

    await roomController.updateRoomKeyWord(room, keyWord);
    return res.status(200).json({}).end();
});

export {
    roomRouter
}
