"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    save: (data, key, backup) => {
        return electron_1.ipcRenderer.invoke('save', data, key, backup);
    },
    load: (key) => {
        return electron_1.ipcRenderer.invoke('load', key);
    },
    delete: (key) => {
        return electron_1.ipcRenderer.invoke('delete', key);
    },
    openFolder: (directoryType) => {
        return electron_1.ipcRenderer.invoke('open-folder', directoryType);
    },
    achievement: (key) => {
        return electron_1.ipcRenderer.invoke('achievement', key);
    },
    hasDlc: (appid) => {
        return electron_1.ipcRenderer.invoke('has-dlc', appid);
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
