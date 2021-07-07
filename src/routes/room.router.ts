import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {authMiddleware} from "../middlewares/auth.middleware";
import InvalidInput from "../errors/invalid-input";
import {UserController} from "../controllers/user.controller";
import BasicError from "../errors/basicError";
import {PartController} from "../controllers/part.controller";
import {ShotController} from "../controllers/shot.controller";

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
        // vérifié sur authorization est fiilled ou non
        const user = await userController.authenticateUserWithToken(req.headers["authorization"]);
        if(user === undefined) {
            return res.status(401).end();
        }else if (user === null) {
            throw new BasicError("The user doesn't exist");
        }


    });

export {
    roomRouter
}
