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
exports.stopRecordingAndSaveFileController = exports.streamRecordingController = exports.startRecordingController = exports.uploadController = exports.streamVideoController = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const model_1 = __importDefault(require("../model"));
const helpers_1 = require("../utils/helpers");
const recordingData = {};
const streamVideoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = req.params;
        const videoFilePath = path.join(__dirname, "../uploads", `${Id}-video.mp4`);
        if (!fs.existsSync(videoFilePath)) {
            return res.status(404).json({
                status: `error`,
                message: `Video not found`,
                success: false,
            });
        }
        const stat = fs.statSync(videoFilePath);
        console.log('stat 3', stat);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            const file = fs.createReadStream(videoFilePath, { start, end });
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
            fs.createReadStream(videoFilePath).pipe(res);
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
const uploadController = (req, res, next) => {
    res.send({
        status: `success`,
        message: `File uploaded successfully!`,
        success: true
    });
};
exports.uploadController = uploadController;
const startRecordingController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoId = (0, helpers_1.generateVideoId)();
        const createdAt = new Date();
        yield model_1.default.create({ videoId, createdAt });
        recordingData[videoId] = { data: [], timeout: null }; // Add a timeout property
        res.status(200).json({
            status: `success`,
            message: `video recording started`,
            data: videoId,
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
        const { Id } = req.params;
        const isExists = yield model_1.default.exists({ videoId: Id });
        if (!isExists) {
            return res.status(404).json({
                status: `error`,
                message: `video not found`,
                success: false,
            });
        }
        const decodedVideoDataChunk = Buffer.from(req.body.videoDataChunk, "base64");
        recordingData[Id].data.push(decodedVideoDataChunk);
        if (recordingData[Id].timeout) {
            clearTimeout(recordingData[Id].timeout);
        }
        recordingData[Id].timeout = setTimeout(() => {
            (0, helpers_1.deleteFile)(Id);
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
        const { Id } = req.params;
        const videoExists = yield model_1.default.exists({ videoId: Id });
        if (!videoExists) {
            return res.status(404).json({
                status: `error`,
                message: "Video not found in the database",
                success: false
            });
        }
        if (recordingData[Id] === undefined ||
            recordingData[Id].data === undefined) {
            return res.status(404).json({
                status: `error`,
                message: "Streaming video doesn't exist",
                success: false
            });
        }
        const videoData = Buffer.concat(recordingData[Id].data);
        const fileName = `${Id}-video.mp4`;
        const directoryPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const videoFilePath = path.join(directoryPath, fileName);
        fs.writeFileSync(videoFilePath, videoData);
        clearTimeout(recordingData[Id].timeout);
        delete recordingData[Id];
        // Now, generate the stream URL and send it in the response
        const streamVideo = `/stream/${Id}`;
        setTimeout(() => {
            (0, helpers_1.deleteFile)(videoFilePath);
        }, 5 * 60 * 1000);
        res.status(200).json({
            status: `success`,
            message: "Video saved successfully",
            streamVideo,
            videoFilePath,
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
