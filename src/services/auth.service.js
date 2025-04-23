const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");

const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User({ ...userData, password: hashedPassword });
  return await newUser.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const accessToken = await tokenService.generateAuthTokens(user);
  const refreshToken = await tokenService.generateRefreshToken(user);
  const { password: _, ...userWithoutPassword } = user.toObject();

  return { user: userWithoutPassword, accessToken, refreshToken };
};

const refreshToken = async (refreshToken) => {
  try {
    const payload = await tokenService.verifyToken(refreshToken);

    const user = await User.findById(payload.id);
    if (!user) return errorResponse(res, {}, "User not found", 404);

    return await tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const setCookieCustom = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = { registerUser, loginUser, refreshToken, setCookieCustom };
