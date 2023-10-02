import fs from "fs";
import { Deepgram } from "@deepgram/sdk";
import { exec } from "child_process";
import pathToFfmpeg from "ffmpeg-static";
import dotenv from "dotenv";

dotenv.config();

const DEEPGRAM_API_KEY: any = process.env.DEEPGRAM_API_KEY;

const deepgram = new Deepgram(DEEPGRAM_API_KEY);

export const videoAudioTranscribe = async (filePath: string) => {
  try {
    exec(
      `${pathToFfmpeg} -i ${filePath} -vn -ar 44100 -ac 2 -ab 192k -f wav ${filePath}.wav`
    );

    const videoAudioBuffer = fs.readFileSync(`${filePath}.wav`);
    const streamSource = {
      buffer: videoAudioBuffer,
      mimetype: "audio/wav",
    };

    const response = await deepgram.transcription.preRecorded(streamSource, {
      punctuate: true,
    });

    fs.unlinkSync(`${filePath}.wav`);

    return response.results;
  } catch (error) {
    console.log(error);
  }
};
