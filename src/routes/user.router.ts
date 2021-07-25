import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {UserController} from "../controllers/user.controller";
import 'express-async-errors';


const userRouter = express.Router();

userRouter.get("/", async function(req, res) {


    const userController = await UserController.getInstance();
    const user = await userController.authenticateUserWithToken(req.headers["authorization"]);
    if(user === undefined) {
        return res.status(401).end();
    }else if (user === null) {
        return res.status(400).end();
    }

    return res.status(200).json(user).end();
});

userRouter.put("/password", async function(req, res) {


    const userController = await UserController.getInstance();
    const user = await userController.authenticateUserWithToken(req.headers["authorization"]);
    if(user === undefined) {
        return res.status(401).end();
    }else if (user === null) {
        return res.status(400).end();
    }

    return res.status(200).json(user).end();
});

export {
    userRouter
};
