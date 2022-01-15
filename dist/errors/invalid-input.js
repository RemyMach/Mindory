"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_custom_error_1 = __importDefault(require("./base-custom-error"));
var InvalidInput = /** @class */ (function (_super) {
    __extends(InvalidInput, _super);
    function InvalidInput(errors) {
        var _this = _super.call(this, 'The input provided is invalid') || this;
        _this.statusCode = 400;
        _this.defaultErrorMessage = 'The input provided is invalid';
        _this.errors = errors;
        Object.setPrototypeOf(_this, InvalidInput.prototype);
        return _this;
    }
    InvalidInput.prototype.getStatusCode = function () {
        return this.statusCode;
    };
    InvalidInput.prototype.serializeErrorOutput = function () {
        return this.parseValidationErrors();
    };
    InvalidInput.prototype.parseValidationErrors = function () {
        var parsedErrors = {};
        if (this.errors && this.errors.length > 0) {
            this.errors.forEach(function (error) {
                if (parsedErrors[error.param]) {
                    parsedErrors[error.param].push(error.msg);
                }
                else {
                    parsedErrors[error.param] = [error.msg];
                }
            });
        }
        return {
            errors: [
                {
                    message: this.defaultErrorMessage,
                    fields: parsedErrors,
                },
            ],
        };
    };
    return InvalidInput;
}(base_custom_error_1.default));
exports.default = InvalidInput;
