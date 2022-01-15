"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfigMiddleware = void 0;
var multer_1 = __importStar(require("multer"));
var MulterConfigMiddleware = /** @class */ (function () {
    function MulterConfigMiddleware() {
    }
    MulterConfigMiddleware.MIME_TYPES_ACCEPTED = {
        "image/jpg": "jpg",
        'image/jpeg': 'jpg',
        'image/png': 'png'
    };
    MulterConfigMiddleware.MIME_TYPES_POSSIBLY_PRESENT_IN_NAME_FILE = [
        "jpg", "jpeg", "png"
    ];
    MulterConfigMiddleware.storage = (0, multer_1.diskStorage)({
        destination: (function (req, file, callback) {
            callback(null, 'src/assets/upload');
        }),
        filename: function (req, file, callback) {
            var name = file.originalname.split(' ').join('-');
            var extensionFormatedForRemove = new RegExp('.{1}(' + MulterConfigMiddleware.MIME_TYPES_POSSIBLY_PRESENT_IN_NAME_FILE.join('|') + ')', 'gm');
            name = name.replace(extensionFormatedForRemove, '');
            var extension = MulterConfigMiddleware.MIME_TYPES_ACCEPTED[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }
    });
    MulterConfigMiddleware.upload = (0, multer_1.default)({ storage: MulterConfigMiddleware.storage });
    return MulterConfigMiddleware;
}());
exports.MulterConfigMiddleware = MulterConfigMiddleware;
