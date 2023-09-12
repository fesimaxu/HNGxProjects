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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserDetail = exports.updateUserDetails = exports.updateUserSingleDetail = exports.getAllUser = exports.getUserById = exports.createUser = void 0;
const uuid_1 = require("uuid");
const validation_1 = require("../utils/validation");
const userModel_1 = require("../model/userModel");
const service_1 = require("../utils/service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, firstName, lastName, email, dateOfBirth, gender, password, repeat_password, phoneNumber, address, occupation } = req.body;
        const birth_year = dateOfBirth.split("-")[2];
        const { error } = validation_1.UserSchema.validate({
            userName,
            firstName,
            lastName,
            gender,
            birth_year,
            email,
            password,
            repeat_password,
        });
        if (error) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: error.message,
            });
        }
        const isExisting = yield userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        if (isExisting) {
            return res.status(400).json({
                status: "error",
                method: req.method,
                message: `user already exists`,
            });
        }
        const hashedPassword = yield (0, service_1.hashPassword)(password);
        const user = (yield userModel_1.UserInstance.create({
            id: (0, uuid_1.v4)(),
            userName,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            email,
            password: hashedPassword,
            address,
            phoneNumber,
            occupation
        }));
        if (!user) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `user not successfully created`,
            });
        }
        const token = (0, service_1.generateSignature)({ email: email, id: user.id });
        const keysToExclude = ["password"];
        const updatedUser = (0, service_1.excludeProperty)(user, keysToExclude);
        const updatedUserDetails = (0, service_1.excludeProperty)(updatedUser._previousDataValues, keysToExclude);
        res.cookie("token", token, {
            expires: (0, service_1.cookieTimeout)(),
        });
        return res.status(200).json({
            status: `success`,
            method: req.method,
            message: `user successfully created`,
            data: updatedUserDetails
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        console.log('data   ', user_id);
        const user = (yield userModel_1.UserInstance.findOne({
            where: { id: user_id },
        }));
        if (!user) {
            return res.status(400).json({
                status: "error",
                method: req.method,
                message: `user does not exists`,
            });
        }
        const keysToExclude = ["password"];
        const updatedUser = (0, service_1.excludeProperty)(user, keysToExclude);
        const updatedUserDetails = (0, service_1.excludeProperty)(updatedUser._previousDataValues, keysToExclude);
        res.status(200).json({
            status: `success`,
            method: req.method,
            message: `User details`,
            data: updatedUserDetails
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserInstance.findAll({});
        if (!users) {
            return res.status(400).json({
                status: "error",
                method: req.method,
                message: `Database is empty`,
            });
        }
        res.status(200).json({
            status: `success`,
            method: req.method,
            message: `Users details`,
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const updateUserSingleDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { userName, firstName, lastName, gender, dateOfBirth, email, password, phoneNumber, address, occupation } = req.body;
    const isExisting = (yield userModel_1.UserInstance.findOne({
        where: { id: user_id },
    }));
    if (!isExisting) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: `user does not exists`,
        });
    }
    const updateUserFields = {};
    if (updateUserFields.userName !== " ") {
        updateUserFields.userName = userName;
    }
    if (updateUserFields.firstName !== " ") {
        updateUserFields.firstName = firstName;
    }
    if (updateUserFields.lastName !== " ") {
        updateUserFields.lastName = lastName;
    }
    if (updateUserFields.gender !== " ") {
        updateUserFields.gender = gender;
    }
    if (updateUserFields.dateOfBirth !== " ") {
        updateUserFields.dateOfBirth = dateOfBirth;
    }
    if (updateUserFields.email !== " ") {
        updateUserFields.email = email;
    }
    if (updateUserFields.password !== " ") {
        updateUserFields.password = password;
    }
    if (updateUserFields.phoneNumber !== " ") {
        updateUserFields.phoneNumber = phoneNumber;
    }
    if (updateUserFields.address !== " ") {
        updateUserFields.address = address;
    }
    if (updateUserFields.occupation !== " ") {
        updateUserFields.occupation = occupation;
    }
    const user = (yield userModel_1.UserInstance.update(updateUserFields, {
        where: { id: user_id },
    }));
    if (!user) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: `user failed to update`,
        });
    }
    res.status(200).json({
        status: `success`,
        method: req.method,
        message: `user updated successfully`,
        data: user,
    });
});
exports.updateUserSingleDetail = updateUserSingleDetail;
const updateUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { userName, firstName, lastName, gender, dateOfBirth, email, password, phoneNumber, address, occupation } = req.body;
    const isExisting = (yield userModel_1.UserInstance.findOne({
        where: { id: user_id },
    }));
    if (!isExisting) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: `user does not exists`,
        });
    }
    const updateUserFields = {
        userName,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        password,
        phoneNumber,
        address,
        occupation
    };
    const user = (yield userModel_1.UserInstance.update(updateUserFields, {
        where: { id: user_id },
    }));
    if (!user) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: `user failed to update`,
        });
    }
    res.status(200).json({
        status: `success`,
        method: req.method,
        message: `user updated successfully`,
        data: user,
    });
});
exports.updateUserDetails = updateUserDetails;
const deleteUserDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const isExisting = (yield userModel_1.UserInstance.findOne({
        where: { id: user_id },
    }));
    if (!isExisting) {
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `user does not exist`,
        });
    }
    const isDeleted = yield userModel_1.UserInstance.destroy({
        where: {
            id: user_id,
        },
    });
    if (!isDeleted) {
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `User is not deleted successfully`,
        });
    }
    res.status(200).json({
        status: `success`,
        method: req.method,
        message: `User deleted successfully`,
    });
});
exports.deleteUserDetail = deleteUserDetail;
