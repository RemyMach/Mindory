import express, {Request, Response}from "express";
import {UserController} from "../controllers/user.controller";
import {PasswordResetController} from "../controllers/passwordReset.controller";
import { body, validationResult } from 'express-validator';
import InvalidInput from "../errors/invalid-input";
import 'express-async-errors';
import {EmailSender} from "../services/mailing";


const passwordResetRouter = express.Router();

passwordResetRouter.post("/", async function(req, res) {

    const email = req.body.email;

    if(email === undefined) {
        res.status(202).end();
        return;
    }

    const userController = await UserController.getInstance();
    const user = await userController.getUserByEmail(email);
    if (user === null)
        return res.status(202).end();

    const passwordController = await PasswordResetController.getInstance();
    const passwordReset = await passwordController.createPasswordReset(user);
    if (!passwordReset)
        return res.status(202).end()

    await passwordController.deleteOtherTokenBeforeTheLastOne(user, passwordReset);

    const emailSender = EmailSender.getInstance();
    await emailSender.sendResetPasswordEmail({
        toEmail: process.env.MAIL_RECEIVER as string,
        tokenGenerate: passwordReset.token
    });

    res.status(202).end();
});

passwordResetRouter.put("/",
    [
        body('token')
            .trim()
            .isLength({ min: 64, max: 64 })
            .withMessage('le token de verification n\'est pas valide'),
        body('password')
            .trim()
            .isLength({ min: 8, max: 50 })
            .withMessage('le mot de passe doit-être entre 8 et 50 carractères'),
    ],
    async function(req: Request, res: Response) {

    const errors = validationResult(req).array();
    if (errors.length > 0) {

        throw new InvalidInput(errors);
    }

    const { token, password } = req.body;
    const passwordResetController = await PasswordResetController.getInstance();

    const userVerificationToken = await passwordResetController.getUserWithFromResetPasswordToken(token);

    if (!userVerificationToken) {
        errors.push({
            location: 'body',
            value: req.body.token,
            param: 'token',
            msg: 'le token de verification n\'est pas valide',
        });
        throw new InvalidInput(errors);
    }

    const userController = await UserController.getInstance();
    try {
        await userController.resetPassword(userVerificationToken, password);
        await passwordResetController.deleteAllTokenForAUser(userVerificationToken);
        return res.status(200).end();
    }catch {
        return res.status(400).end();
    }
});

export {
    passwordResetRouter
};