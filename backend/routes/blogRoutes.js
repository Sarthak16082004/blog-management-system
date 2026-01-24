const express = require('express');
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
} = require('../controllers/blogController');

const authMiddleware = require('../middleware/authMiddleware');

// CREATE BLOG (Protected)
router.post('/blogs', authMiddleware, createBlog);

// READ ALL BLOGS (Public)
router.get('/blogs', getAllBlogs);

// READ SINGLE BLOG (Public)
router.get('/blogs/:id', getBlogById);

module.exports = router;
