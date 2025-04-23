const express = require("express");
const router = express.Router();
const trimRequest = require("../middlewares/trimRequest.middleware");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

router.post("/register", trimRequest, register);
router.post("/login", trimRequest, login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
