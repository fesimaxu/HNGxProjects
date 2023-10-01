"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.generateUniqueSessionID = void 0;
const fs_1 = __importDefault(require("fs"));
const generateUniqueSessionID = () => {
    return Date.now().toString();
};
exports.generateUniqueSessionID = generateUniqueSessionID;
const deleteFile = (filePath) => {
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
        }
        else {
            console.log(`Deleted file: ${filePath}`);
        }
    });
};
exports.deleteFile = deleteFile;
