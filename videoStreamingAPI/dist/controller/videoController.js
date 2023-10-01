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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamVideoController = exports.stopRecordingAndSaveFileController = exports.streamRecordingController = exports.startRecordingController = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const model_1 = __importDefault(require("../model"));
const helpers_1 = require("../utils/helpers");
const recordingData = {};
const startRecordingController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionID = (0, helpers_1.generateUniqueSessionID)();
        const createdAt = new Date();
        console.log("New recording started: ", "Session ID:", sessionID, createdAt);
        yield model_1.default.create({ sessionID, createdAt });
        recordingData[sessionID] = { data: [], timeout: null }; // Add a timeout property
        res.status(200).json({
            status: `success`,
            message: `video recording started`,
            data: sessionID,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            status: `error`,
            message: `video recording failed`,
            data: console.log(error),
            success: false,
        });
    }
});
exports.startRecordingController = startRecordingController;
const streamRecordingController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionID } = req.params;
        const sessionExists = yield model_1.default.exists({ sessionID });
        console.log(sessionID);
        console.log(sessionExists);
        console.log(recordingData);
        if (!sessionExists) {
            return res.status(404).json({
                status: `error`,
                message: `Session not found in the database`,
                success: false,
            });
        }
        console.log(`Received video data chunk for session ${sessionID}`);
        const decodedVideoDataChunk = Buffer.from(req.body.videoDataChunk, "base64");
        recordingData[sessionID].data.push(decodedVideoDataChunk);
        if (recordingData[sessionID].timeout) {
            clearTimeout(recordingData[sessionID].timeout);
        }
        recordingData[sessionID].timeout = setTimeout(() => {
            (0, helpers_1.deleteFile)(sessionID);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
        res.status(200).json({
            status: `success`,
            message: "Video data chunk received successfully",
            success: true,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: `error`,
            message: "Failed to stream video data",
            success: false
        });
    }
});
exports.streamRecordingController = streamRecordingController;
const stopRecordingAndSaveFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionID } = req.params;
        const sessionExists = yield model_1.default.exists({ sessionID });
        if (!sessionExists) {
            return res.status(404).json({
                status: `error`,
                message: "Session not found in the database",
                success: false
            });
        }
        if (recordingData[sessionID] === undefined ||
            recordingData[sessionID].data === undefined) {
            return res.status(404).json({
                status: `error`,
                message: "Streaming session doesn't exist",
                success: false
            });
        }
        const videoData = Buffer.concat(recordingData[sessionID].data);
        const uniqueFilename = `${sessionID}-video.mp4`;
        const directoryPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const videoURL = path.join(directoryPath, uniqueFilename);
        fs.writeFileSync(videoURL, videoData);
        clearTimeout(recordingData[sessionID].timeout);
        delete recordingData[sessionID];
        // Now, generate the stream URL and send it in the response
        const streamURL = `/stream/${sessionID}`;
        setTimeout(() => {
            (0, helpers_1.deleteFile)(videoURL);
        }, 5 * 60 * 1000);
        res.status(200).json({
            status: `success`,
            message: "Video saved successfully",
            streamURL,
            videoURL,
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: `error`,
            message: "Failed to stop recording and save file",
            success: false
        });
    }
});
exports.stopRecordingAndSaveFileController = stopRecordingAndSaveFileController;
const streamVideoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionID } = req.params;
        console.log('sessionID ', sessionID);
        const videoURL = path.join(__dirname, "../uploads", `${sessionID}-video.mp4`);
        console.log('videoURL ', videoURL);
        if (!fs.existsSync(videoURL)) {
            return res.status(404).json({
                status: `error`,
                message: `Video not found`,
                success: false,
            });
        }
        const stat = fs.statSync(videoURL);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            const file = fs.createReadStream(videoURL, { start, end });
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4",
            };
            res.writeHead(206, headers);
            file.pipe(res);
        }
        else {
            const headers = {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
            };
            res.writeHead(200, headers);
            fs.createReadStream(videoURL).pipe(res);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: `error`,
            message: "failed",
            success: false,
        });
    }
});
exports.streamVideoController = streamVideoController;
