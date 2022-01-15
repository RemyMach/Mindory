"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var password_reset_1 = require("../password_reset");
describe('tests the token generation function', function () {
    it('should produce a string of length 64', function () {
        expect((0, password_reset_1.generateToken)()).toHaveLength(64);
    });
});
