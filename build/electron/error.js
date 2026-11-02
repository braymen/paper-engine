"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eatError = void 0;
const electron_1 = require("electron");
const eatError = (where, error, wasBad) => {
    const errorMessage = `[${where}]: ${error}`;
    console.log(errorMessage);
    // TODO: Log to file
    if (wasBad) {
        electron_1.app.quit();
    }
};
exports.eatError = eatError;
