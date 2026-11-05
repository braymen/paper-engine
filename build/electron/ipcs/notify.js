"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
const node_notifier_1 = __importDefault(require("node-notifier"));
const notify = (ipc) => {
    ipc.handle('notify', (_event, message) => {
        node_notifier_1.default.notify(message);
    });
};
exports.notify = notify;
