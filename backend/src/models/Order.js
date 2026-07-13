const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  size: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: String,
      city: String,
      province: String,
      postalCode: String
    }
  },
  items: [orderItemSchema],
  deliveryMethod: {
    type: String,
    enum: ['same-day', 'next-day', 'mail-order'],
    required: true
  },
  deliveryWindow: { type: String }, // "10am-2pm", "2pm-6pm", "6pm-10pm"
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: { type: String, default: 'E-Transfer' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Pending' },
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  notes: { type: String },
  trackingNumber: { type: String },
  notificationSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
