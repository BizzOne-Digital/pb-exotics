const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.get('/:slug', getPost);
router.post('/', protect, adminOnly, createPost);
router.put('/:id', protect, adminOnly, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);

module.exports = router;
