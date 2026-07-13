const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const streamifier = require('streamifier');

// Use memory storage (stream directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'), false);
  }
});

const uploadToCloudinary = (buffer, folder = 'pb-exotics') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// POST upload single image
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file provided' });
  const result = await uploadToCloudinary(req.file.buffer);
  res.json({ url: result.secure_url, publicId: result.public_id });
});

// POST upload multiple images
const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ message: 'No files provided' });
  const uploads = await Promise.all(req.files.map(f => uploadToCloudinary(f.buffer)));
  res.json(uploads.map(r => ({ url: r.secure_url, publicId: r.public_id })));
});

// DELETE image from Cloudinary
const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) return res.status(400).json({ message: 'publicId required' });
  await cloudinary.uploader.destroy(publicId);
  res.json({ message: 'Image deleted' });
});

module.exports = { upload, uploadImage, uploadImages, deleteImage };
