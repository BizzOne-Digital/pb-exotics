const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Cloudinary URL
  caption: { type: String, default: '' },
  category: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
