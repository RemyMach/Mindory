"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var crypto_1 = require("crypto");
function generateToken() {
    return (0, crypto_1.randomBytes)(32).toString('hex');
}
exports.generateToken = generateToken;
