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
const utils_1 = require("./utils");
const ipc_1 = require("./ipc");
const platform = process.platform;
// Unsupported OS check
if (platform !== 'win32') {
    process.exit(1);
}
let steam;
try {
    steam = Steamworks.init(config.STEAM_APPID || 480);
    if (!steam)
        throw (0, console_1.error)('Steam Client was unable to be initialized');
}
catch (err) {
    (0, utils_1.spitLog)('Steamworks Initialization', JSON.stringify(err), true);
}
(0, utils_1.spitLog)('Steamworks Initialization', 'Steamworks has been initialized', false);
function createWindow() {
    // Create the window
    const window = new electron_1.BrowserWindow({
        minWidth: config.MIN_WINDOW_WIDTH,
        minHeight: config.MIN_WINDOW_HEIGHT,
        width: config.MIN_WINDOW_WIDTH,
        height: config.MIN_WINDOW_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            backgroundThrottling: false
        },
        autoHideMenuBar: true,
        center: true,
        show: false,
        icon: path.join(__dirname, 'favicon.svg')
    });
    // Setup the settings
    window.removeMenu();
    window.show();
    window.webContents.openDevTools({ mode: 'detach' });
    window.loadURL('http://localhost:5173');
    // Window Cleanup
    window.on('closed', () => {
        electron_1.app.quit();
        return;
    });
    return window;
}
electron_1.app.whenReady().then(() => {
    (0, utils_1.spitLog)('App Ready', 'App is now ready and starting the createWindow()', false);
    // Setup the Window
    const window = createWindow();
    // Setup the IPCs
    (0, ipc_1.setupIpcHandlers)(electron_1.ipcMain, steam, electron_1.app, window);
    // Finished Setting up
    (0, utils_1.spitLog)('App Read', "App has run through it's functions", false);
});
