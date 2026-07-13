const express = require('express');
const router = express.Router();
const { upload, uploadImage, uploadImages, deleteImage } = require('../controllers/uploadController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/single', protect, adminOnly, upload.single('image'), uploadImage);
router.post('/multiple', protect, adminOnly, upload.array('images', 10), uploadImages);
router.delete('/', protect, adminOnly, deleteImage);

module.exports = router;
