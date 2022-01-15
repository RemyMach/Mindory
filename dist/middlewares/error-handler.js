"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_custom_error_1 = __importDefault(require("../errors/base-custom-error"));
var errorHandler = function (err, req, res, _next) {
    if (err instanceof base_custom_error_1.default) {
        return res.status(err.getStatusCode()).send(err.serializeErrorOutput());
    }
    console.log(err);
    return res.status(500).end();
};
exports.default = errorHandler;
