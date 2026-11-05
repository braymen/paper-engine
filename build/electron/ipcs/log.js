"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const utils_1 = require("../utils");
const log = (ipc) => {
    ipc.handle('log', (_event, message) => {
        (0, utils_1.spitLog)('UI', message, false);
    });
};
exports.log = log;
