import { Schema, model } from "mongoose";
import { IVideoDetails } from "../interface";


/**
 * @swagger
 * components:
 *  schemas:
 *    VideoInput:
 *      type: object
 *      required: true
 *        - sessionID
 *        - createdAt
 *      properties:
 *        sessionID:
 *          type: string
 *          default: 1696097217927
 *        createdAt:
 *          type: date
 *          default: 2023-10-01T22:18:13.179Z

 *
 *    VideoResponse:
 *      type: Object
 *      properties:
 *        _id:
 *          type: string
 *        sessionID:
 *          type: string
 *        createdAt:
 *          type: string
 *
 *
 */

export const VideoSessionSchema: Schema = new Schema<IVideoDetails>(
  {
    sessionID: {
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
