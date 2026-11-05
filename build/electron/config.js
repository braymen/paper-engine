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
exports.getHashPath = exports.getSavePath = exports.HASH_KEY = exports.DATA_KEY = exports.LOG_DIRECTORY = exports.BACKUP_DIRECTORY = exports.SAVE_DIRECTORY = exports.DIRECTORY = exports.BACKUP_INTERVAL_SECS = exports.MIN_WINDOW_HEIGHT = exports.MIN_WINDOW_WIDTH = exports.STEAM_APPID = exports.GAME_NAME = exports.COMPANY_NAME = void 0;
const path = __importStar(require("path"));
exports.COMPANY_NAME = 'Paper Crown Games';
exports.GAME_NAME = 'A Paper Crown Game';
exports.STEAM_APPID = 480;
exports.MIN_WINDOW_WIDTH = 1296;
exports.MIN_WINDOW_HEIGHT = 759;
exports.BACKUP_INTERVAL_SECS = 30;
exports.DIRECTORY = path.join(process.env.APPDATA, exports.COMPANY_NAME, exports.GAME_NAME);
exports.SAVE_DIRECTORY = path.resolve(exports.DIRECTORY, 'saves');
exports.BACKUP_DIRECTORY = path.resolve(exports.DIRECTORY, 'saves/backups');
exports.LOG_DIRECTORY = path.resolve(exports.DIRECTORY, 'logs');
exports.DATA_KEY = 'data';
exports.HASH_KEY = 'hash';
const getSavePath = (key) => `${exports.SAVE_DIRECTORY}\\saveslot${key}-data`;
exports.getSavePath = getSavePath;
const getHashPath = (key) => `${exports.SAVE_DIRECTORY}\\saveslot${key}-hash`;
exports.getHashPath = getHashPath;
