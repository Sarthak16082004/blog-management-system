require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const blogRoutes = require('./routes/blogRoutes');

const connectMongo = require('./config/mongo');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', blogRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend running with MySQL + MongoDB + Blogs');
});

// Connect MongoDB
connectMongo();

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
