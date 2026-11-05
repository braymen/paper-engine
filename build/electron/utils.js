"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashContent = exports.spitLog = void 0;
const electron_1 = require("electron");
const js_md5_1 = require("js-md5");
const spitLog = (where, message, wasBad) => {
    const errorMessage = `[${where}]: ${message}`;
    console.log(errorMessage);
    // TODO: Log to file
    if (wasBad) {
        electron_1.app.quit();
    }
};
exports.spitLog = spitLog;
const hashContent = (content) => {
    return (0, js_md5_1.md5)(content);
};
exports.hashContent = hashContent;
