const User = require('../models/user.model');

const registerUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

module.exports = { registerUser };