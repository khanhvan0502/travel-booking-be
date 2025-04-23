const jwt = require("jsonwebtoken");

const verifyToken = async (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

const generateAuthTokens = async (user) => {
  return await jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = async (user) => {
  return await jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  verifyToken,
  generateAuthTokens,
  generateRefreshToken,
};
