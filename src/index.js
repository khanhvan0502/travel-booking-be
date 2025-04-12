require('dotenv').config();
const express = require('express');
const connectDB = require('./config');
const userRoutes = require('./routes/user.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
