import { Request, Response, NextFunction } from "express";
import * as path from "path";
import * as fs from "fs";
import VideoSession from "../model";
import { deleteFile, generateVideoId } from "../utils/helpers";
import { videoAudioTranscribe } from "../utils/service";

const recordingData: Record<string, any> = {};

export const streamVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Id } = req.params;


    const videoFilePath = path.join(
      __dirname,
      "../uploads",
      `${Id}-video.mp4`
    );
    
    if (!fs.existsSync(videoFilePath)) {
      return res.status(404).json({
        status: `error`,
        message: `Video not found`,
        success: false,
      });
    }


    const stat = fs.statSync(videoFilePath);
    console.log('stat 3', stat)
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
    } else {
      const headers = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, headers);
      fs.createReadStream(videoFilePath).pipe(res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: `error`,
      message: "failed",
      success: false,
    });
  }
};


export const uploadController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.send( { 
    status: `success`,
    message: `File uploaded successfully!`,
    success: true
  })
}

export const startRecordingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videoId = generateVideoId();
    const createdAt = new Date();
    
    await VideoSession.create({ videoId, createdAt });
    recordingData[videoId] = { data: [], timeout: null }; // Add a timeout property

    res.status(200).json({
      status: `success`,
      message: `video recording started`,
      data: videoId,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      status: `error`,
      message: `video recording failed`,
      data: console.log(error),
      success: false,
    });
  }
};

export const streamRecordingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Id } = req.params;
    const isExists = await VideoSession.exists({ videoId: Id });


    if (!isExists) {
      return res.status(404).json({
        status: `error`,
        message: `video not found`,
        success: false,
      });
    }


    const decodedVideoDataChunk = Buffer.from(
      req.body.videoDataChunk,
      "base64"
    );
    recordingData[Id].data.push(decodedVideoDataChunk);

    if (recordingData[Id].timeout) {
      clearTimeout(recordingData[Id].timeout);
    }

    recordingData[Id].timeout = setTimeout(() => {
      deleteFile(Id);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    res.status(200).json({
      status: `success`,
      message: "Video data chunk received successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        status: `error`,
        message: "Failed to stream video data",
        success: false
    });
  }
};

export const stopRecordingAndSaveFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Id } = req.params;
    const videoExists = await VideoSession.exists({ videoId : Id });

    if (!videoExists) {
      return res.status(404).json({ 
            status: `error`,
            message: "Video not found in the database",
            success: false
        });
    }

    if (
      recordingData[Id] === undefined ||
      recordingData[Id].data === undefined
    ) {
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

    // generate the stream URL and send it in the response
    const streamVideo = `/stream/${Id}`;

    // generate the audio transcript of the video
    const videoTranscript = await videoAudioTranscribe(videoFilePath);

    setTimeout(() => {
      deleteFile(videoFilePath);
    }, 5 * 60 * 1000);

    
    res.status(200).json({ 
        status: `success`,
        message: "Video saved successfully",
        streamVideo, 
        videoFilePath ,
        videoTranscript,
        success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        status: `error`,
        message: "Failed to stop recording and save file",
        success: false
    });
  }
};




