import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {UserRepository} from "../repositories/user.repository";

const authRouter = express.Router();

authRouter.post("/subscribe", async function(req, res) {

    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;

    if(name === undefined || password === undefined || username === undefined || surname === undefined || email === undefined) {
        res.status(400).end();
        return;
    }


    const authController = await AuthController.getInstance();
    try{
        const user = await authController.subscribe({
            name,
            surname,
            email,
            password,
            username
        });

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

    }catch(validationError){
        res.status(400).end();
        //res.json(BuilderError.returnApiMessage(validationError.message));
    }
});

authRouter.post("/login", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if(email === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    const authController = await AuthController.getInstance();
    try{
        const session = await authController.log({email, password});

        if(session === null) {
            res.status(400).end();
            return;
        } else {
            res.json({
                token: session.token
            });
        }

    }catch(validationError){
        console.log(validationError)
        res.status(400).end();
        //res.json(BuilderError.returnApiMessage(validationError.message));
        return;
    }
});

authRouter.delete("/logout", authMiddleware,async function(req, res) {
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

export {
    authRouter
};
