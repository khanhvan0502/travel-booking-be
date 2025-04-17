const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");

const register = async (req, res) => {
  try {
    const savedUser = await authService.registerUser(req.body);
    return successResponse(
      res,
      { user: savedUser },
      "User registered successfully",
      201
    );
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Registration failed");
  }
};

module.exports = { register };
