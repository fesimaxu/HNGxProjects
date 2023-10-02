"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videoController_1 = require("../controller/videoController");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/videouploads:
 *   post:
 *     tags:
 *       - VideoSession
 *     summary: Start Screen Recording
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: file
 *             properties:
 *               video:
 *                 type: string
 *           example:
 *             {"video": [https://d376c22qqmec5c.cloudfront.net/1696097217927_ucvideo.mp4]}
 *     description: Video uploaded successfully
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.post("/videouploads", upload_1.upload.single("file"), videoController_1.uploadController);
/**
 * @swagger
 * /api/v1/streamvideo/{videoId}:
 *   get:
 *     summary: Get video to stream real time
 *     tags:
 *       - VideoSession
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Stream video real time.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
 *       500:
 *         description: Failed to Video failed to stream.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
 */
router.get("/streamvideo/:videoId", videoController_1.streamVideoController);
/**
 * @swagger
 * /api/v1/startrecording:
 *   post:
 *     tags:
 *       - VideoSession
 *     summary: Start Screen Recording
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               video:
 *                 type: string
 *           example:
 *             {"videoId": "1234456", "createdAt": 2023-10-01T22:18:13.179Z}
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.post("/startrecording/:videoId", videoController_1.startRecordingController);
/**
 * @swagger
 * /api/v1/stoprecording/{videoId}:
 *   get:
 *     summary: Get video to stream real time
 *     tags:
 *       - VideoSession
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Stop Streaming video real time.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Failed to Video failed to stream.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post("/stoprecording/:videoId", videoController_1.stopRecordingAndSaveFileController);
/**
 * @swagger
 * /api/v1/streamrecording/{videoId}:
 *   post:
 *     summary: Get video to stream real time
 *     tags:
 *       - VideoSession
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Stream Recorded video real time.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
 *       500:
 *         description: Failed to Video failed to stream.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ""
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
 *         description: Successful
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.get('https://d376c22qqmec5c.cloudfront.net/1696097217927_ucvideo.mp4');
exports.default = router;
