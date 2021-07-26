import express, {Request, Response}from "express";
import {UserController} from "../controllers/user.controller";
import {PasswordResetController} from "../controllers/passwordReset.controller";
import {body, param, validationResult} from 'express-validator';
import InvalidInput from "../errors/invalid-input";
import 'express-async-errors';
import {EmailSender} from "../services/mailing";
import {authMiddleware} from "../middlewares/auth.middleware";


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

passwordResetRouter.get("/:token",
    [
        param('token')
            .trim()
            .isLength({ min: 64, max: 255 })
            .withMessage('le token de verification n\'est pas valide'),
    ],
    async function(req: Request, res: Response) {

        const errors = validationResult(req).array();
        if (errors.length > 0) {

            throw new InvalidInput(errors);
        }

        const { token } = req.params;
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

        return res.status(200).end();
    });

passwordResetRouter.put("/",
    [
        body('token')
            .trim()
            .isLength({ min: 64, max: 255 })
            .withMessage('le token de verification n\'est pas valide'),
        body('password')
            .trim()
            .isLength({ min: 8, max: 50 })
            .withMessage('le mot de passe doit-être entre 8 et 50 caractères'),
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

passwordResetRouter.put("/change",
    [
        body('oldPassword')
            .trim()
            .isLength({ min: 8, max: 50 })
            .withMessage('le mot de passe doit-être entre 8 et 50 caractères'),
        body('newPassword')
            .trim()
            .isLength({ min: 8, max: 50 })
            .withMessage('le mot de passe doit-être entre 8 et 50 caractères')
    ],
    authMiddleware,
    async function(req: Request, res: Response) {

    const errors = validationResult(req).array();
    if (errors.length > 0) {

        throw new InvalidInput(errors);
    }

    const userController = await UserController.getInstance();

    const user = await userController.authenticateUserWithToken(req.headers["authorization"]);
    if (user === undefined || user === null)
        throw new Error();

    const { oldPassword, newPassword } = req.body;
    const passwordResetController = await PasswordResetController.getInstance();
    try {
        await userController.changePassword(user, newPassword, oldPassword);
        await passwordResetController.deleteAllTokenForAUser(user);
        return res.status(200).end();
    }catch {
        return res.status(400).end();
    }
});

export {
    passwordResetRouter
};
