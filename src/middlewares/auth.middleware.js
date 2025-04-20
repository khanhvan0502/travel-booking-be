const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/token.model");
const { errorResponse } = require("../utils/response");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, {}, "Unauthorized", 401);
  }

  // Check blacklist
  const isBlacklisted = await TokenBlacklist.findOne({ token });
  if (isBlacklisted) {
    return errorResponse(res, {}, "Token is blacklisted", 401);
  }

  // get token for format: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return errorResponse(res, {}, "Access denied. No token provided.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, {}, "Invalid or expired token", 403);
  }
};

module.exports = { authenticateToken };
