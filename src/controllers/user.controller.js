const userService = require('../services/user.service');

exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.addUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};
