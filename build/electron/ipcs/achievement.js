"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievement = void 0;
const achievement = (ipc, steam) => {
    ipc.handle('achievement', (_event, key) => {
        steam.achievement.activate(key);
    });
};
exports.achievement = achievement;
