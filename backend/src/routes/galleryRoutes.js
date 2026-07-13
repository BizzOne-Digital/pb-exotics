const express = require('express');
const router = express.Router();
const { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getGalleryImages);
router.post('/', protect, adminOnly, createGalleryImage);
router.put('/:id', protect, adminOnly, updateGalleryImage);
router.delete('/:id', protect, adminOnly, deleteGalleryImage);

module.exports = router;
