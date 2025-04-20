const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Lấy token theo format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      data: {},
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // đính kèm user vào req
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      data: {},
      message: 'Invalid or expired token'
    });
  }
};

module.exports = { authenticateToken };
