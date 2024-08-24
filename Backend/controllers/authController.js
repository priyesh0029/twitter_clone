import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import AppError from "../utilities/appError.js";
import { authServices } from "../middlewares/authServices.js";
import { HttpStatus } from "../utilities/errorTypes.js";
import { ErrorMessage } from "../utilities/errorMessage.js";

export const authControllers = {
  // User Register
  registerUser: asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    // Check for existing user with the same email or username
    const existingUser = await User.query()
      .where((builder) => {
        builder.where("email", email).orWhere("username", username);
      })
      .first();

    if (existingUser) {
      throw new AppError(
       ErrorMessage.SAME_USER_SIGNUP_ERR,
        HttpStatus.UNAUTHORIZED
      );
    }

    // Hash the password
    const hashedPassword = await authServices.encryptPassword(password);

    // Create the new user
    const newUser = await User.query().insert({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = await authServices.generateToken({
      id: newUser.id,
      role: "user",
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        },
        token
      },
    });
  }),

  // User Login
  loginUser: asyncHandler(async (req, res) => {
    console.log("login user controller : ", req.body);
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      throw new AppError(ErrorMessage.CREDENTIAL_REQUIRED_ERR, HttpStatus.BAD_REQUEST);
    }

    // Find the user based on email or username
    const user = await User.query()
      .where((builder) => {
        builder.where("email", username).orWhere("username", username);
      })
      .first();

    if (!user) {
      throw new AppError(ErrorMessage.INVALID_CREDENTIAL_ERR, HttpStatus.UNAUTHORIZED);
    }

    // Compare the password
    const isPasswordMatch = await authServices.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new AppError(ErrorMessage.INVALID_CREDENTIAL_ERR, HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const token = await authServices.generateToken({
      id: user.id,
      role: "user",
    });
    console.log("token  : ", token);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
        token
      },
    });
  }),

};
