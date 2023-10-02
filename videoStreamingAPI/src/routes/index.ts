import { Router } from "express";
import { startRecordingController, stopRecordingAndSaveFileController, streamRecordingController, streamVideoController } from "../controller/videoController";


const router = Router();



router.post('/startrecording', startRecordingController);
router.post('/stoprecording/:sessionID', stopRecordingAndSaveFileController);
router.post('/streamrecording/:sessionID', streamRecordingController);
router.get('/streamvideo', streamVideoController);




export default router;