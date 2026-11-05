"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullscreen = void 0;
const getFullscreen = (ipc, window) => {
    ipc.handle('get-fullscreen', () => {
        return window.fullScreen;
    });
};
exports.getFullscreen = getFullscreen;
