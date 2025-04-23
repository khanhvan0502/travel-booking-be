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

    const result = await authService.loginUser(
      userWithoutPassword.email,
      password
    );
    const { user, accessToken, refreshToken } = result;

    await authService.setCookieCustom(res, refreshToken);

    return successResponse(
      res,
      { user, token: accessToken },
      "User registered successfully"
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

    const result = await authService.loginUser(email, password);
    if (!result) {
      return errorResponse(res, {}, "Invalid email or password", 400);
    }

    const { user, accessToken, refreshToken } = result;

    await authService.setCookieCustom(res, refreshToken);

    return successResponse(
      res,
      { user, token: accessToken },
      "Login successful"
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, {}, "Login failed");
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });

  try {
    const newAccessToken = await authService.refreshToken(refreshToken);
    return successResponse(res, { token: newAccessToken }, "Token refreshed");
  } catch (err) {
    console.log(err);
    return errorResponse(res, {}, "Invalid refresh token", 403);
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

module.exports = { register, login, refreshToken, logout };
