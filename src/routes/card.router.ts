import {body, oneOf, validationResult} from "express-validator";
import express, {Request, Response}from "express";
import {adminAuthMiddleware} from "../middlewares/auth.middleware";
import InvalidInput from "../errors/invalid-input";
import multer, {Multer} from "multer";
import {MulterConfigMiddleware} from "../middlewares/multerConfig.middleware";
import 'express-async-errors';
import fs from 'fs';
import BasicError from "../errors/basicError";

const cardRouter = express.Router();

cardRouter.post("/",[
        adminAuthMiddleware,
        MulterConfigMiddleware.upload.single('image')
    ],
    async function(req: Request, res: Response) {

        const image = req.file.filename;
        const text = req.body.text;
        if(image === undefined && text === undefined)
            throw new BasicError("you have to provide text or file");

        if(image !== undefined && text != undefined) {
            fs.unlink(req.file.path, () => {});
            throw new BasicError("you can't provide image and text choose one");
        }




        return res.status(201).send().end();
});

export {
    cardRouter
};
