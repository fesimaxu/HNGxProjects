"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'RESOURCE API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API on a resource',
    }
};
const options = {
    swaggerDefinition,
    apis: ['/swagger.json'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
