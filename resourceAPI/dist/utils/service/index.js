"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludePropertiesFromArray = exports.excludeProperty = exports.cookieTimeout = exports.verifySignature = exports.generateSignature = exports.verifyPassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateSalt = () => {
    const saltRounds = 10;
    return bcrypt_1.default.genSalt(saltRounds);
};
const hashPassword = (plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield generateSalt();
    return bcrypt_1.default.hash(plainPassword, salt);
});
exports.hashPassword = hashPassword;
const verifyPassword = (plainPassword, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(plainPassword, hashPassword);
});
exports.verifyPassword = verifyPassword;
const generateSignature = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const value = jsonwebtoken_1.default.sign(data, `${process.env.TOKEN_SECRET}`, {
        expiresIn: `${process.env.TOKEN_EXPIRES_IN}m`,
    });
    return value;
});
exports.generateSignature = generateSignature;
const verifySignature = (signature) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(signature, `${process.env.TOKEN_SECRET}`);
    //return jwt.verify(signature, TOKEN_SECRET!)
});
exports.verifySignature = verifySignature;
const cookieTimeout = () => {
    const expiresIn = new Date(Date.now() + Number(process.env.TOKEN_EXPIRES_IN) * 60 * 1000);
    return expiresIn;
};
exports.cookieTimeout = cookieTimeout;
const excludeProperty = (obj, keysToExclude) => {
    const newObj = Object.assign({}, obj);
    for (const key of keysToExclude) {
        if (newObj.hasOwnProperty(key)) {
            delete newObj[key];
        }
    }
    return newObj;
};
exports.excludeProperty = excludeProperty;
function excludePropertiesFromArray(arr, keysToExclude) {
    return arr.map((obj) => {
        const newObj = Object.assign({}, obj);
        for (const key of keysToExclude) {
            if (newObj.hasOwnProperty(key)) {
                delete newObj[key];
            }
        }
        return newObj;
    });
}
exports.excludePropertiesFromArray = excludePropertiesFromArray;
