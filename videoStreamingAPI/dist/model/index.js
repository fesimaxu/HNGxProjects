"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSessionSchema = void 0;
const mongoose_1 = require("mongoose");
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
