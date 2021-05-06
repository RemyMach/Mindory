import express from "express";
import {buildRoutes} from "./routes";

const app = express();

app.use(express.json());

buildRoutes(app);

export default app;
