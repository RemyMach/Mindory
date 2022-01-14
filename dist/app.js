"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
require("express-async-errors");
var middlewares_1 = require("./middlewares");
var basicError_1 = __importDefault(require("./errors/basicError"));
var express_prom_bundle_1 = __importDefault(require("express-prom-bundle"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', '*']);
    next();
});
app.use(function (req, res, next) {
    console.log(process.env.PROM_TOKEN);
    console.log("je me nomme");
    if (req.path === '/metrics' && req.headers.authorization !== "Bearer " + process.env.PROM_TOKEN) {
        throw new basicError_1.default("you can't see metrics");
    }
    next();
});
app.use((0, express_prom_bundle_1.default)({
    metricsPath: '/metrics',
    includeMethod: true,
    includePath: true,
    customLabels: { app: 'Mindory' },
    promClient: {
        collectDefaultMetrics: {
            labels: { app: 'Mindory' },
        },
    },
}));
(0, routes_1.buildRoutes)(app);
app.use(middlewares_1.errorHandler);
exports.default = app;
