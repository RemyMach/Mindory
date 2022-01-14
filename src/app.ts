import express, {NextFunction, Request, Response, ErrorRequestHandler, application} from "express";
import {buildRoutes} from "./routes";
import 'express-async-errors';
import {errorHandler} from "./middlewares";
import BasicError from "./errors/basicError";
import promBundle from 'express-prom-bundle';

const app = express();

app.use(express.json());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type','Authorization', '*']);

    next();
});

app.use(function (req, res, next) {
    if (req.path === '/metrics' && req.headers.authorization !== `Bearer ${process.env.PROM_TOKEN}`) {
		throw new BasicError("you can't see metrics");
	}
    next();
});

app.use(
	promBundle({
		metricsPath: '/metrics',
		includeMethod: true,
        includePath: true,
		customLabels: { app: 'Mindory' },
		promClient: {
			collectDefaultMetrics: {
				labels: { app: 'Mindory' },
			},
		},
	})
)

buildRoutes(app);

app.use(errorHandler);

export default app
