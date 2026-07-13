const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  tag: { type: String, default: 'News' }, // e.g. "Guide", "Launch", "News"
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  image: { type: String }, // Cloudinary URL
  published: { type: Boolean, default: true }
}, { timestamps: true });

const makeSlug = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

postSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = makeSlug(this.title);
  }
  next();
});

postSchema.pre('insertMany', function (next, docs) {
  docs.forEach((doc) => {
    doc.slug = makeSlug(doc.title);
  });
  next();
});

module.exports = mongoose.model('Post', postSchema);
