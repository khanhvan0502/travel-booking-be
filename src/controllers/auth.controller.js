const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const savedUser = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = { register };
