require("dotenv").config();
const express = require("express");
const connectDB = require("./config");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
