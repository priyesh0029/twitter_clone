import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import AppError from "../utilities/appError.js";
import { authServices } from "../middlewares/authServices.js";

export const authControllers = {
  // User Register
  registerUser: asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
  
    // Check for existing user with the same email or username
    const existingUser = await User.query().where(builder => {
      builder.where('email', email).orWhere('username', username);
    }).first();

    if (existingUser) {
      throw new AppError(
        "User with the same email or username already exists",
        401
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
      id: newUser.id, // Use .id for Objection.js
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
        token,
      },
    });
  }),
  
  // User Login
  loginUser: asyncHandler(async (req, res) => {
    console.log("login user controller : ", req.body);
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        throw new AppError("Login credential and password are required", 400);
    }

    // Find the user based on email or username
    const user = await User.query().where(builder => {
      builder.where('email', username).orWhere('username', username);
    }).first();

    if (!user) {
        throw new AppError("Invalid login credentials", 401);
    }

    // Compare the password
    const isPasswordMatch = await authServices.comparePassword(password, user.password);

    if (!isPasswordMatch) {
        throw new AppError("Invalid login credentials", 401);
    }

    // Generate JWT token
    const token = await authServices.generateToken({
        id: user.id,
        role: "user",
    });

    res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id, 
            name: user.name,
            username: user.username,
            email: user.email,
          },
          token,
        },
    });
  })
};
