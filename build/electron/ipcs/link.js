"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = void 0;
const electron_1 = require("electron");
const link = (ipc) => {
    ipc.handle('link', (_event, url) => {
        electron_1.shell.openExternal(url);
    });
};
exports.link = link;
