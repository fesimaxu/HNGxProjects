import { Schema, model } from "mongoose";
import { IVideoDetails } from "../interface";


/**
 * @swagger
 * components:
 *  schemas:
 *    VideoInput:
 *      type: object
 *      required: true
 *        - videoId
 *        - createdAt
 *      properties:
 *        videoId:
 *          type: string
 *          default: 1696097217927
 *        createdAt:
 *          type: date
 *          default: 2023-10-01T22:18:13.179Z
 *     VideoSessionResponse:
 *      type: Object
 *      properties:
 *        _id:
 *          type: string
 *        videoId:
 *          type: string
 *        createdAt:
 *          type: string
 *
 *
 */

export const VideoSessionSchema: Schema = new Schema<IVideoDetails>(
  {
    videoId: {
        type: String,
        required: true,
        unique: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
    }
);

export default model<IVideoDetails>(`VideoSession`, VideoSessionSchema);
