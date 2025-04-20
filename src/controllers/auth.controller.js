const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");
const TokenBlacklist = require("../models/token.model");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || password.length < 8 || password.length > 32) {
      return errorResponse(
        res,
        {},
        "Password must be between 8 and 32 characters long",
        400
      );
    }

    const savedUser = await authService.registerUser(req.body);
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return successResponse(
      res,
      { user: userWithoutPassword },
      "User registered successfully",
      201
    );
  } catch (err) {
    console.error(err);
    return errorResponse(res, {}, "Registration failed");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, {}, "Email and password are required", 400);
    }

    const user = await authService.loginUser(email, password);

    if (!user) {
      return errorResponse(res, {}, "Invalid email or password", 400);
    }
    return successResponse(res, user, "Login successful");
  } catch (error) {
    console.error(err);
    return errorResponse(res, {}, "Login failed");
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return errorResponse(res, {}, "Token is requited", 400);
    }

    const decoded = require("jsonwebtoken").decode(token);
    if (!decoded || !decoded.exp) {
      return errorResponse(res, {}, "Invalid token", 400);
    }
    const expiresAt = new Date(decoded.exp * 1000);

    await TokenBlacklist.create({
      token,
      expiresAt,
    });

    return successResponse(res, {}, "Logout successful");
  } catch (error) {
    return errorResponse(res, {}, "Internal server error");
  }
};

module.exports = { register, login, logout };
