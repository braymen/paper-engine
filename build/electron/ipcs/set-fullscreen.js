"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFullscreen = void 0;
const setFullscreen = (ipc, window) => {
    ipc.handle('set-fullscreen', (_event, fullscreen) => {
        window.setFullScreen(fullscreen);
    });
};
exports.setFullscreen = setFullscreen;
