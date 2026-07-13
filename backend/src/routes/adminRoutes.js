const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// GET all users (admin)
router.get('/users', protect, adminOnly, asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
}));

// PUT update user role
router.put('/users/:id/role', protect, adminOnly, asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
  res.json(user);
}));

module.exports = router;
