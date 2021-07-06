import express, {Request, Response} from "express";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import {UserController} from "../controllers/user.controller";

const roleRouter = express.Router();

roleRouter.get("/", adminAuthMiddleware, async function(req: Request, res: Response) {
    const userController = await UserController.getInstance();
    const user = await userController.authenticateUserWithToken(req.headers["authorization"]);

    if(user === undefined || user === null){
        return res.status(401).end();
    }

    const json = JSON.parse(JSON.stringify(user));

    return res.status(200).json({role_label: json.Role.label}).end();
});

export {
    roleRouter
};
