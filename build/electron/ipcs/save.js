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
exports.save = void 0;
const fs = __importStar(require("fs"));
const config = __importStar(require("../config"));
const utils_1 = require("../utils");
const js_md5_1 = require("js-md5");
const save = (ipc) => {
    ipc.handle('save', (_event, data, key, backup) => {
        (0, utils_1.spitLog)('Saving', 'Starting to save the data.', false);
        const savePath = config.getSavePath(key);
        (0, utils_1.spitLog)('Saving', `Save path using: ${savePath}`, false);
        const dataString = JSON.stringify(data);
        (0, utils_1.spitLog)('Saving', `Stringified save: ${dataString}`, false);
        const hashPath = config.getHashPath(key);
        (0, utils_1.spitLog)('Saving', `Hash path using: ${hashPath}`, false);
        // Create a last known good save, for hashing later
        const previousSavePath = `${savePath}.previous`;
        try {
            if (fs.existsSync(savePath)) {
                (0, utils_1.spitLog)('Saving', 'Copying save into .previous.', false);
                fs.copyFileSync(savePath, previousSavePath);
            }
            else {
                (0, utils_1.spitLog)('Saving', 'Skipping save into .previous.', false);
            }
        }
        catch (err) {
            (0, utils_1.spitLog)('Saving', `Failed to copy previous save. ${err}`, false);
        }
        // Create new save as a temp file
        const tempSavePath = `${savePath}.temp`;
        try {
            (0, utils_1.spitLog)('Saving', 'Writing save as a temp file', false);
            fs.writeFileSync(tempSavePath, dataString, { flush: true });
        }
        catch (err) {
            (0, utils_1.spitLog)('Saving', `Failed to save the data to a temp file. ${err}`, false);
        }
        // Rename temp file to replace current save
        try {
            (0, utils_1.spitLog)('Saving', 'Renaming temp file as save', false);
            fs.renameSync(tempSavePath, savePath);
        }
        catch (err) {
            (0, utils_1.spitLog)('Saving', `Failed to rename the save file and override the current save. ${err}`, false);
        }
        // Create a hash of the save
        try {
            (0, utils_1.spitLog)('Saving', 'Creating a hashfile for save', false);
            fs.writeFileSync(hashPath, (0, js_md5_1.md5)(dataString), { flush: true });
        }
        catch (err) {
            (0, utils_1.spitLog)('Saving', `Failed to create hash file for the save. ${err}`, false);
        }
        // Create a backup if backup is true
        if (backup) {
            try {
                (0, utils_1.spitLog)('Saving', 'Creating a backup of save', false);
                fs.writeFileSync(`${config.BACKUP_DIRECTORY}/${config.DATA_KEY}${key}_${Date.now()}`, dataString, {
                    flush: true
                });
            }
            catch (err) {
                (0, utils_1.spitLog)('Saving', `Failed to save a backup. ${err}`, false);
            }
        }
        else {
            (0, utils_1.spitLog)('Saving', 'Skipping the backup for save', false);
        }
    });
};
exports.save = save;
