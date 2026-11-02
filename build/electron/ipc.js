"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIpcHandlers = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const quit_1 = require("./ipcs/quit");
const link_1 = require("./ipcs/link");
const setupIpcHandlers = (ipc, steam, directory, app, window) => {
    const saveDirectory = path.resolve(directory, 'saves');
    const backupDirectory = path.resolve(directory, 'saves/backups');
    const logDirectory = path.resolve(directory, 'logs');
    let lastBackup = Date.now();
    try {
        // Only need to do the backup directory, since
        // it's nested in the save and recursive is true
        if (!fs.existsSync(backupDirectory)) {
            fs.mkdirSync(backupDirectory, { recursive: true });
        }
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }
    }
    catch (err) {
        // TODO: Handle Errors
        console.log('Log Folder Check: ', err);
    }
    // Initialize all the IPCs
    (0, link_1.link)(ipc);
    (0, quit_1.quit)(ipc, app);
};
exports.setupIpcHandlers = setupIpcHandlers;
