"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = void 0;
function shuffleArray(inputArray) {
    inputArray.sort(function () { return Math.random() - 0.5; });
}
exports.shuffleArray = shuffleArray;
