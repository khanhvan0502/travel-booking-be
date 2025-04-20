const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, require: true, unique: true },
  expiresAt: { type: Date, require: true },
});

tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("TokenBlacklist", tokenBlacklistSchema);
