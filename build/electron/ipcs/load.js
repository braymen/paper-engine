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
exports.load = void 0;
const utils_1 = require("../utils");
const config = __importStar(require("../config"));
const fs = __importStar(require("fs"));
const js_md5_1 = require("js-md5");
const load = (ipc) => {
    ipc.handle('load', (_event, key) => {
        (0, utils_1.spitLog)('Loading', 'Starting to load the data.', false);
        const loadPath = config.getSavePath(key);
        (0, utils_1.spitLog)('Loading', `Save path using: ${loadPath}`, false);
        const hashPath = config.getHashPath(key);
        (0, utils_1.spitLog)('Loading', `Hash path using: ${hashPath}`, false);
        // Attempt to load file
        let dataString;
        try {
            (0, utils_1.spitLog)('Loading', `Loading data for slot ${key}`, false);
            dataString = fs.readFileSync(loadPath).toString();
            (0, utils_1.spitLog)('Loading', `Parsing the data into JSON`, false);
        }
        catch (err) {
            (0, utils_1.spitLog)('Loading', `Failed to load the data. ${err}`, false);
        }
        // Load the hash from the file
        let hashString;
        try {
            (0, utils_1.spitLog)('Loading', `Loading hash for ${key}`, false);
            hashString = fs.readFileSync(hashPath).toString();
            (0, utils_1.spitLog)('Loading', `Parsing the hash into a string`, false);
        }
        catch (err) {
            (0, utils_1.spitLog)('Loading', `Failed to load the data. ${err}`, false);
        }
        if (!dataString || !hashString) {
            return null;
        }
        (0, utils_1.spitLog)('Loading', `Loaded hash from file: ${hashString}`, false);
        (0, utils_1.spitLog)('Loading', `Loaded save re-hashed: ${(0, js_md5_1.md5)(dataString)}`, false);
        return dataString;
        // Fails to parse, attempt to use the previous
    });
};
exports.load = load;
