const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  category: {
    type: String,
    enum: ['Flower', 'Edibles', 'Concentrates', 'Vapes', 'Accessories', 'Other'],
    required: true
  },
  strain: {
    type: String,
    enum: ['Indica', 'Sativa', 'Hybrid', 'N/A'],
    default: 'N/A'
  },
  genetics: { type: String }, // e.g. "OG Kush x Durban Poison"
  thc: { type: String }, // e.g. "24-28%"
  cbd: { type: String },
  description: { type: String, required: true },
  effects: [{ type: String }], // e.g. ["Relaxed", "Happy", "Euphoric"]
  flavours: [{ type: String }],
  images: [{ type: String }], // Cloudinary URLs
  pricing: [
    {
      size: { type: String }, // e.g. "HQ", "Q", "Half Oz", "Oz"
      price: { type: Number }
    }
  ],
  contactForPricing: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }]
}, { timestamps: true });

// Auto-generate slug
const makeSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = makeSlug(this.name);
  }
  next();
});

// insertMany bypasses 'save' middleware, so slugs must be generated here too
productSchema.pre('insertMany', function (next, docs) {
  docs.forEach((doc) => {
    doc.slug = makeSlug(doc.name);
  });
  next();
});

module.exports = mongoose.model('Product', productSchema);
