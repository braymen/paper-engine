"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDlc = void 0;
const hasDlc = (ipc, steam) => {
    ipc.handle('has-dlc', (_event, appid) => {
        return steam.apps.isDlcInstalled(appid);
    });
};
exports.hasDlc = hasDlc;
