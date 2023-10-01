import { Schema, model } from "mongoose";
import { IVideoDetails } from "../interface";

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
