"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmailApi = exports.mockResetPasswordEmail = void 0;
exports.mockResetPasswordEmail = jest.fn(function (toEmail) {
    return new Promise(function (resolve) { return resolve({ toEmail: toEmail, status: 'success' }); });
});
var MockEmailApi = /** @class */ (function () {
    function MockEmailApi() {
    }
    MockEmailApi.prototype.sendResetPasswordEmail = function (_a) {
        var toEmail = _a.toEmail;
        return (0, exports.mockResetPasswordEmail)(toEmail);
    };
    return MockEmailApi;
}());
exports.MockEmailApi = MockEmailApi;
