import express from "express";
import {UserController} from "../controllers/user.controller";
import {PasswordResetController} from "../controllers/passwordReset.controller";

const passwordResetRouter = express.Router();

passwordResetRouter.post("/", async function(req, res) {

    const email = req.body.email;

    if(email === undefined) {
        res.status(400).end();
        return;
    }

    const userController = await UserController.getInstance();
    const user = await userController.getUserByEmail(email);
    if (user === null)
        return res.status(202).end();

    const passwordController = await PasswordResetController.getInstance();
    const passwordReset = await passwordController.createPasswordReset(user);
    if (!passwordController)
        return res.status(400).end()

    res.status(201).json(passwordReset).end();
});

export {
    passwordResetRouter
};
