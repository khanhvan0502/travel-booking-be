const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  // Create JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );

  const { password: _, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token };
};

module.exports = { registerUser, loginUser };
