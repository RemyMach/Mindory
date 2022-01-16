import express, {Request, Response} from "express";
import {AuthController} from "../controllers/auth.controller";
import {adminAuthMiddleware, authMiddleware} from "../middlewares/auth.middleware";
import {UserRepository} from "../repositories/user.repository";
import 'express-async-errors';
import {UserController} from "../controllers/user.controller";
import {body, validationResult} from "express-validator";
import InvalidInput from "../errors/invalid-input";
import {UserInstance} from "../models/user.model";

const authRouter = express.Router();

authRouter.post("/subscribe",
    [
        body("name")
            .exists()
            .isString()
            .withMessage("un nom est requis"),
        body("surname")
            .exists()
            .isString()
            .withMessage("un nom est requis"),
        body("username")
            .exists()
            .isString()
            .withMessage("un username est requis"),
        body("email")
            .exists()
            .isString()
            .withMessage("un mail est requis"),

    ],
    async function(req: Request, res: Response) {
        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

    const {name, surname, password, username, email} = req.body;

    const authController = await AuthController.getInstance();
    let user: UserInstance | null;
    try {
        user = await authController.subscribe({
            name,
            surname,
            email,
            password,
            username
        });
    }catch(e: any) {
        return res.status(400).send(e.message).end();
    }

    if(user === null) {
        res.status(400).end();
        return;
    }
    res.status(201);
    res.json({
        name,
        surname,
        email,
        username
    });
});

authRouter.post("/login", async function(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    if(email === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    const authController = await AuthController.getInstance();
    try{
        const session = await authController.log({email, password});
        if(session === null)
            return res.status(400).end();

        return res.status(200).json({token: session.token}).end();

    }catch(validationError){
        res.status(400).end();
        return;
    }
});

authRouter.delete("/logout", authMiddleware,async function(req: Request, res: Response) {
    const auth = req.headers["authorization"];
    if(auth === undefined) {
        res.status(403).end();
        return;
    }

    const token = auth.replace('Bearer ', '');
    const authController = await AuthController.getInstance();

    try{
        const session = await authController.deleteSession(token);

        if(session === null) {
            res.status(400).end();
            return;
        } else {
            res.status(200).json({"message": "the token has been deleted"}).end();
        }

    }catch(validationError){
        res.status(400).end();
        return;
    }

});

authRouter.get("/token", authMiddleware,async function(req: Request, res: Response) {

    return res.status(200).end();
});


authRouter.get("/token/role/admin", adminAuthMiddleware,async function(req: Request, res: Response) {

    return res.status(200).end();
});

export {
    authRouter
};
