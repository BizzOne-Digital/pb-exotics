const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const { sendOrderNotification } = require('../utils/notifications');

// POST create order (public)
const createOrder = asyncHandler(async (req, res) => {
  const { customer, items, deliveryMethod, deliveryWindow, subtotal, deliveryFee, total, notes } = req.body;
  const order = await Order.create({
    customer, items, deliveryMethod, deliveryWindow,
    subtotal, deliveryFee, total, notes,
    paymentMethod: 'E-Transfer'
  });

  // Send notification to admin via GHL/App Pass
  try {
    await sendOrderNotification(order);
    await Order.findByIdAndUpdate(order._id, { notificationSent: true });
  } catch (err) {
    console.error('Notification failed:', err.message);
  }

  res.status(201).json(order);
});

// GET all orders (admin)
const getOrders = asyncHandler(async (req, res) => {
  const { status, deliveryMethod } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (deliveryMethod) filter.deliveryMethod = deliveryMethod;
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
});

// GET single order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// PUT update order status (admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber, paymentStatus } = req.body;
  const update = {};
  if (status) update.status = status;
  if (trackingNumber) update.trackingNumber = trackingNumber;
  if (paymentStatus) update.paymentStatus = paymentStatus;
  const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// DELETE order (admin)
const deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});

// GET dashboard stats (admin)
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'Pending' });
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayOrders = await Order.countDocuments({ createdAt: { $gte: todayStart } });
  const revenueResult = await Order.aggregate([
    { $match: { paymentStatus: 'Paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);
  const revenue = revenueResult[0]?.total || 0;
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
  res.json({ totalOrders, pendingOrders, todayOrders, revenue, recentOrders });
});

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus, deleteOrder, getDashboardStats };
