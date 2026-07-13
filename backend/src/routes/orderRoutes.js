const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrder, updateOrderStatus, deleteOrder, getDashboardStats } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createOrder); // Public - customers place orders
router.get('/', protect, adminOnly, getOrders);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/:id', protect, adminOnly, getOrder);
router.put('/:id', protect, adminOnly, updateOrderStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;
