const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controllers/user.controller");
const { authenticateToken } = require('../middlewares/auth.middleware');

router.get("/", getUsers);
router.post("/", addUser);

router.get('/profile', authenticateToken, (req, res) => {
  const user = req.user;
  res.json({
    status: 'success',
    data: { user },
    message: 'Profile fetched successfully'
  });
});

module.exports = router;

module.exports = router;
