const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");

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
    return errorResponse(res, "Registration failed");
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

module.exports = { register, login };
