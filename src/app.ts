import express from "express";
import {buildRoutes} from "./routes";

const app = express();


app.use(express.json());


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type','Authorization']);

    next();
});

buildRoutes(app);

export default app;
