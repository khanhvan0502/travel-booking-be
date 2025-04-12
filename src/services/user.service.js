const User = require('../models/user.model');

exports.getAllUsers = async () => {
  return await User.find();
};

exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};
