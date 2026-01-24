const Blog = require('../models/Blog');

// CREATE BLOG (already working)
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    const blog = new Blog({
      title,
      content,
      authorId: req.user.id,
    });

    await blog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating blog',
      error: error.message,
    });
  }
};

// GET ALL BLOGS (NEW)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
};

// GET SINGLE BLOG BY ID (NEW)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found',
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching blog',
      error: error.message,
    });
  }
};
