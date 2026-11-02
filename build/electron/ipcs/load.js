"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quit = void 0;
const quit = (ipc, app) => {
    ipc.handle('quit', () => {
        app.quit();
    });
};
exports.quit = quit;
