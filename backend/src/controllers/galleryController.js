const asyncHandler = require('express-async-handler');
const GalleryImage = require('../models/GalleryImage');

// GET all gallery images (public)
const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
  res.json(images);
});

// POST create gallery image (admin)
const createGalleryImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.create(req.body);
  res.status(201).json(image);
});

// PUT update gallery image (admin)
const updateGalleryImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!image) return res.status(404).json({ message: 'Image not found' });
  res.json(image);
});

// DELETE gallery image (admin)
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await GalleryImage.findByIdAndDelete(req.params.id);
  if (!image) return res.status(404).json({ message: 'Image not found' });
  res.json({ message: 'Image deleted' });
});

module.exports = { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage };
