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
const quit_1 = require("./ipcs/quit");
const link_1 = require("./ipcs/link");
const config = __importStar(require("./config"));
const set_fullscreen_1 = require("./ipcs/set-fullscreen");
const get_fullscreen_1 = require("./ipcs/get-fullscreen");
const utils_1 = require("./utils");
const achievement_1 = require("./ipcs/achievement");
const open_folder_1 = require("./ipcs/open-folder");
const notify_1 = require("./ipcs/notify");
const log_1 = require("./ipcs/log");
const has_dlc_1 = require("./ipcs/has-dlc");
const save_1 = require("./ipcs/save");
const load_1 = require("./ipcs/load");
const setupIpcHandlers = (ipc, steam, app, window) => {
    try {
        // Only need to do the backup directory, since it's nested in the save and recursive is true
        if (!fs.existsSync(config.BACKUP_DIRECTORY)) {
            fs.mkdirSync(config.BACKUP_DIRECTORY, { recursive: true });
        }
        if (!fs.existsSync(config.LOG_DIRECTORY)) {
            fs.mkdirSync(config.LOG_DIRECTORY, { recursive: true });
        }
    }
    catch (err) {
        (0, utils_1.spitLog)('Setting up Directories', JSON.stringify(err), true);
    }
    // Initialize all the IPCs
    (0, achievement_1.achievement)(ipc, steam);
    (0, link_1.link)(ipc);
    (0, log_1.log)(ipc);
    (0, has_dlc_1.hasDlc)(ipc, steam);
    (0, notify_1.notify)(ipc);
    (0, open_folder_1.openFolder)(ipc);
    (0, get_fullscreen_1.getFullscreen)(ipc, window);
    (0, set_fullscreen_1.setFullscreen)(ipc, window);
    (0, save_1.save)(ipc);
    (0, load_1.load)(ipc);
    (0, quit_1.quit)(ipc, app);
};
exports.setupIpcHandlers = setupIpcHandlers;
