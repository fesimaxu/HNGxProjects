"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PROD_PORT, PROD_DB_NAME, PROD_DB_HOST, PROD_DB_USERNAME, PROD_DB_PASSWORD } = process.env;
exports.default = {
    PORT: PROD_PORT,
    DB_NAME: PROD_DB_NAME,
    DB_HOST: PROD_DB_HOST,
    DB_USERNAME: PROD_DB_USERNAME,
    DB_PASSWORD: PROD_DB_PASSWORD
};
console.log("running in production mode");
