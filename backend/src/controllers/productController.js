const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// GET all products (public)
const getProducts = asyncHandler(async (req, res) => {
  const { category, strain, search, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (strain) filter.strain = strain;
  if (featured) filter.featured = true;
  if (search) filter.name = { $regex: search, $options: 'i' };
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// GET single product (public)
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }) || await Product.findById(req.params.slug);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST create product (admin)
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// PUT update product (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// DELETE product (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
