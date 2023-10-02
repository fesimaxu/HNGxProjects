"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSessionSchema = void 0;
const mongoose_1 = require("mongoose");
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
exports.VideoSessionSchema = new mongoose_1.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)(`VideoSession`, exports.VideoSessionSchema);
