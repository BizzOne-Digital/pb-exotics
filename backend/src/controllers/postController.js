const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

// GET all posts (public — published only; admin gets all via ?all=true)
const getPosts = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { published: true };
  const posts = await Post.find(filter).sort({ createdAt: -1 });
  res.json(posts);
});

// GET single post (public)
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }) || await Post.findById(req.params.slug);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// POST create post (admin)
const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
});

// PUT update post (admin)
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// DELETE post (admin)
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
});

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
