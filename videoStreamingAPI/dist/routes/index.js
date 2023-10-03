"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videoController_1 = require("../controller/videoController");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: VideoSession
 *     description: Operations related to video recording
 */
/**
 * @swagger
 * /api/v1/videouploads:
 *   post:
 *     tags:
 *       - VideoSession
 *     summary: Upload video
 *     description: Upload a video file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Successfully streamed the video.
 *       404:
 *         description: Session not found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Failed to stream video data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post("/videouploads", upload_1.upload.single("file"), videoController_1.uploadController);
/**
 * @swagger
 * /api/v1/streamvideo/{videoId}:
 *   get:
 *     summary: Stream video
 *     description: Stream the recorded video for a session.
 *     tags:
 *       - VideoSession
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recording session.
 *     responses:
 *       200:
 *         description: Video stream.
 *       404:
 *         description: Video not found.
 *       500:
 *         description: Failed to stream video.
 */
router.get("/streamvideo/:videoId", videoController_1.streamVideoController);
/**
 * @swagger
 * /api/v1/startrecording:
 *   get:
 *     summary: Start a new recording session
 *     description: Start a new video recording session.
 *     tags:
 *       - VideoSession
 *     responses:
 *       200:
 *         description: New recording session started successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videoId:
 *                   type: string
 *                   description: The ID of the recording session.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.get("/startrecording", videoController_1.startRecordingController);
/**
 * @swagger
 * /api/v1/stoprecording/{videoId}:
  *   post:
 *     summary: Stop recording and save the file
 *     description: Stop a recording session and save the video file.
 *     tags:
 *       - VideoSession
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recording session.
 *     responses:
 *       200:
 *         description: Video saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 streamVideo:
 *                   type: string
 *                   description: The URL to stream the saved video.
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 videoFilePath:
 *                   type: string
 *                   description: The URL to access the saved video file.
 *                 transcription:
 *                   type: string
 *                   description: The transcription of the video.
 *       404:
 *         description: Session not found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Failed to stop recording and save file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post("/stoprecording/:videoId", videoController_1.stopRecordingAndSaveFileController);
/**
 * @swagger
 * /api/v1/streamrecording/{videoId}:
 *   post:
 *     summary: Stream recording data
 *     description: Stream video recording data for a session.
 *     tags:
 *       - VideoSession
 *     parameters:
 *       - in: path
 *         name: videoId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recording session.
 *       - in: body
 *         name: videoDataChunk
 *         description: Base64-encoded video data chunk.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             videoDataChunk:
 *               type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoDataChunk:
 *                 type: string
 *                 description: Base64-encoded video data chunk.
 *             required:
 *               - videoDataChunk
 *     responses:
 *       200:
 *         description: Video data chunk received successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       404:
 *         description: Session not found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Failed to stream video data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post("/streamrecording/:videoId", videoController_1.streamRecordingController);
/**
 * @swagger
 * https://d376c22qqmec5c.cloudfront.net/1696097217927_ucvideo.mp4:
 *   get:
 *     tags:
 *       - VideoSession
 *     summary: Streaming video
 *     description: AWS S3 Video streaming successfully
 *     responses:
 *       200:
 *         description: Video saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 streamVideo:
 *                   type: string
 *                   description: Stream the video from AWS S3 bucket.
 *                 message:
 *                   type: string
 *                   description: A successfully streaming the video.
 *       404:
 *         description: Session not found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Failed to stream video data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.get('https://d376c22qqmec5c.cloudfront.net/1696097217927_ucvideo.mp4');
exports.default = router;
