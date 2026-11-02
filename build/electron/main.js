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
const electron_1 = require("electron");
const path = __importStar(require("path"));
const config = __importStar(require("./config"));
const Steamworks = __importStar(require("steamworks.js"));
const console_1 = require("console");
const error_1 = require("./error");
const platform = process.platform;
// Unsupported OS check
if (platform !== 'win32') {
    process.exit(1);
}
const saveDirectory = path.join(electron_1.app.getPath('userData'), config.COMPANY_NAME, config.GAME_NAME);
let steam;
try {
    steam = Steamworks.init(config.STEAM_APPID || 480);
    if (!steam)
        throw (0, console_1.error)('Steam Client was unable to be initialized');
}
catch (err) {
    (0, error_1.eatError)('Steamworks Initialization', JSON.stringify(err), true);
}
function createWindow() {
    const win = new electron_1.BrowserWindow({
        minWidth: config.MIN_WINDOW_WIDTH,
        minHeight: config.MIN_WINDOW_HEIGHT,
        width: config.MIN_WINDOW_WIDTH,
        height: config.MIN_WINDOW_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            backgroundThrottling: false
        },
        autoHideMenuBar: true,
        center: true,
        show: false,
        icon: path.join(__dirname, 'favicon.svg')
    });
    win.removeMenu();
    win.show();
    win.webContents.openDevTools({ mode: 'detach' });
    win.loadURL('http://localhost:5173');
    win.on('closed', () => {
        electron_1.app.quit();
        return;
    });
}
electron_1.app.whenReady().then(createWindow);
