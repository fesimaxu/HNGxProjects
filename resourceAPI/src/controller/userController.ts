import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { UserSchema } from "../utils/validation";
import { UserInstance } from "../model/userModel";
import {
  cookieTimeout,
  excludeProperty,
  generateSignature,
  hashPassword,
} from "../utils/service";
import { UserAttributes } from "../utils/constants";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      password,
      repeat_password,
      phoneNumber,
      address,
      occupation
    } = req.body;

    const birth_year = dateOfBirth.split("-")[2];

    const { error } = UserSchema.validate({
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

    const isExisting = await UserInstance.findOne({
      where: { email: email },
    });

    if (isExisting) {
      return res.status(400).json({
        status: "error",
        method: req.method,
        message: `user already exists`,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = (await UserInstance.create({
      id: v4(),
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
    })) as unknown as UserAttributes;

    if (!user) {
      return res.status(400).json({
        status: `error`,
        method: req.method,
        message: `user not successfully created`,
      });
    }

    const token = generateSignature({ email: email, id: user.id });

    const keysToExclude = ["password"];
    const updatedUser = excludeProperty(user, keysToExclude);

    const updatedUserDetails = excludeProperty(
      updatedUser._previousDataValues,
      keysToExclude
    );

    res.cookie("token", token, {
      expires: cookieTimeout(),
    });

    return res.status(200).json({
      status: `success`,
      method: req.method,
      message: `user successfully created`,
      data: updatedUserDetails
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;

    console.log('data   ',user_id)

    const user = (await UserInstance.findOne({
      where: { id: user_id },
    })) as unknown as UserAttributes;

    if (!user) {
      return res.status(400).json({
        status: "error",
        method: req.method,
        message: `user does not exists`,
      });
    }

    res.status(200).json({
      status: `success`,
      method: req.method,
      message: `User details`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    
    const users = await UserInstance.findAll({});

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

  } catch (error) {
    next(error)
  }
};

export const updateUserSingleDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;

  const {
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
  } = req.body;

  const isExisting = (await UserInstance.findOne({
    where: { id: user_id },
  })) as unknown as UserAttributes;

  if (!isExisting) {
    return res.status(400).json({
      status: "error",
      method: req.method,
      message: `user does not exists`,
    });
  }

  const updateUserFields: Partial<UserAttributes> = {};

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

  const user = (await UserInstance.update(updateUserFields, {
    where: { id: user_id },
  })) as unknown as UserAttributes;

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
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;

  const {
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
  } = req.body;

  const isExisting = (await UserInstance.findOne({
    where: { id: user_id },
  })) as unknown as UserAttributes;

  if (!isExisting) {
    return res.status(400).json({
      status: "error",
      method: req.method,
      message: `user does not exists`,
    });
  }

  const updateUserFields: UserAttributes = {
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

  const user = (await UserInstance.update(updateUserFields, {
    where: { id: user_id },
  })) as unknown as UserAttributes;

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
};

export const deleteUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;

  const isExisting = (await UserInstance.findOne({
    where: { id: user_id },
  })) as unknown as UserAttributes;

  if (!isExisting) {
    return res.status(400).json({
      status: `error`,
      method: req.method,
      message: `user does not exist`,
    });
  }

  const isDeleted = await UserInstance.destroy({
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
};
