"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    save: (data, key) => {
        return electron_1.ipcRenderer.invoke('save', data, key);
    },
    load: (key) => {
        return electron_1.ipcRenderer.invoke('load', key);
    },
    delete: (key) => {
        return electron_1.ipcRenderer.invoke('delete', key);
    },
    openFolder: () => {
        return electron_1.ipcRenderer.invoke('open-folder');
    },
    achievement: (key) => {
        return electron_1.ipcRenderer.invoke('achievement', key);
    },
    retriggerAchievments: (keys) => {
        return electron_1.ipcRenderer.invoke('retrigger-achievements', keys);
    },
    hasDlc: (dlc) => {
        return electron_1.ipcRenderer.invoke('has-dlc', dlc);
    },
    link: (url) => {
        return electron_1.ipcRenderer.invoke('link', url);
    },
    log: (level, message) => {
        return electron_1.ipcRenderer.invoke('log', level, message);
    },
    setFullscreen: (fullscreen) => {
        return electron_1.ipcRenderer.invoke('set-fullscreen', fullscreen);
    },
    getFullscreen: () => {
        return electron_1.ipcRenderer.invoke('get-fullscreen');
    },
    notify: (message) => {
        return electron_1.ipcRenderer.invoke('notify', message);
    },
    quit: () => {
        return electron_1.ipcRenderer.invoke('quit');
    }
});
