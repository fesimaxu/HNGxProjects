import { Router } from "express";
import { startRecordingController, stopRecordingAndSaveFileController, streamRecordingController, streamVideoController, uploadController } from "../controller/videoController";
import { upload } from "../middleware/upload";


const router = Router();


/**
 * @swagger
 * /api/v1/startrecording:
 *   post:
 *     tags:
 *       - Video
 *     summary: Start Screen Recording
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               sessionID:
 *                 type: string
 *           example:
 *             {"sessionID": "1234456", "createdAt": 2023-10-01T22:18:13.179Z}
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

router.post('/startrecording/:sessionId', startRecordingController);

/**
 * @swagger
 * /api/v1/stoprecording/{sessionID}:
 *   get:
 *     summary: Get video to stream real time
 *     tags:
 *       - Video
 *     parameters:
 *       - in: path
 *         name: sessionID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Stop Streaming video real time.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/VideoSchema"
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
router.post('/stoprecording/:sessionId', stopRecordingAndSaveFileController);

/**
 * @swagger
 * /api/v1/streamrecording/{sessionID}:
 *   Post:
 *     summary: Get video to stream real time
 *     tags:
 *       - Video
 *     parameters:
 *       - in: path
 *         name: sessionID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Stream Recorded video real time.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/VideoSchema"
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
router.post('/streamrecording/:sessionId', streamRecordingController);

/**
 * @swagger
 * /api/v1/streamvideo/{sessionID}:
 *   get:
 *     summary: Get video to stream real time
 *     tags:
 *       - Video
 *     parameters:
 *       - in: path
 *         name: sessionID
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
router.get('/streamvideo/:sessionId', streamVideoController);


/**
 * @swagger
 * /api/v1/videouploads:
 *   post:
 *     tags:
 *       - Video
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

router.post('/videouploads',upload.single('file'), uploadController);

/**
 * @swagger
 * https://d376c22qqmec5c.cloudfront.net/1696097217927_ucvideo.mp4:
 *   get:
 *     tags:
 *       - Video
 *     summary: Streaming video
 *     description: Video streaming successfully
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

export default router;