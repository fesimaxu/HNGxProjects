"use strict";
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
exports.videoAudioTranscribe = void 0;
const fs_1 = __importDefault(require("fs"));
const sdk_1 = require("@deepgram/sdk");
const child_process_1 = require("child_process");
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const deepgram = new sdk_1.Deepgram(DEEPGRAM_API_KEY);
const videoAudioTranscribe = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, child_process_1.exec)(`${ffmpeg_static_1.default} -i ${filePath} -vn -ar 44100 -ac 2 -ab 192k -f wav ${filePath}.wav`);
        const videoAudioBuffer = fs_1.default.readFileSync(`${filePath}.wav`);
        const streamSource = {
            buffer: videoAudioBuffer,
            mimetype: "audio/wav",
        };
        const response = yield deepgram.transcription.preRecorded(streamSource, {
            punctuate: true,
        });
        fs_1.default.unlinkSync(`${filePath}.wav`);
        return response.results;
    }
    catch (error) {
        console.log(error);
    }
});
exports.videoAudioTranscribe = videoAudioTranscribe;
