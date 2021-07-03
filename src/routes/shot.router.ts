import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {authMiddleware} from "../middlewares/auth.middleware";
import InvalidInput from "../errors/invalid-input";
import {UserController} from "../controllers/user.controller";
import BasicError from "../errors/basicError";
import {PartController} from "../controllers/part.controller";
import {ShotController} from "../controllers/shot.controller";

const shotRouter = express.Router();

shotRouter.post("/",
    [
        authMiddleware,
        body("cardIds")
            .isArray({min: 2, max: 2})
            .withMessage("you have to fill an array of cards to register a shot"),
        body("partId")
            .isNumeric()
            .withMessage("you have to fill a valid part"),
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

        const { cardIds, partId} = req.body;
        const shotController = await ShotController.getInstance();
        const part = await shotController.part.findByPk(partId);
        if(part === null)
            throw new BasicError("The part doesn't exist");

        const userIsInThePart = await shotController.verifyIfUserIsInThePart(user, part);

        if(!userIsInThePart)
            throw new BasicError("The user is not in the part");

        const shot = await shotController.createShot(part, user, cardIds);

        return res.status(200).json(shot).end();
    });

export {
    shotRouter
}
