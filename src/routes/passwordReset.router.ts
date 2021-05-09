import express from "express";
import {UserController} from "../controllers/user.controller";
import {PasswordResetController} from "../controllers/passwordReset.controller";

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

    res.status(202).end();
});

export {
    passwordResetRouter
};
