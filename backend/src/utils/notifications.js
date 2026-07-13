/**
 * Sends order notification to admin via GoHighLevel (App Pass / webhook)
 * Configure GHL_WEBHOOK_URL in .env to point to your GHL webhook trigger
 */
const sendOrderNotification = async (order) => {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('GHL_WEBHOOK_URL not set — skipping notification');
    return;
  }

  const payload = {
    event: 'new_order',
    orderId: order._id.toString(),
    customer: {
      name: order.customer.name,
      phone: order.customer.phone,
      email: order.customer.email
    },
    deliveryMethod: order.deliveryMethod,
    deliveryWindow: order.deliveryWindow || 'N/A',
    total: `$${order.total.toFixed(2)}`,
    items: order.items.map(i => `${i.name} (${i.size}) x${i.quantity}`).join(', '),
    notes: order.notes || 'None',
    placedAt: new Date(order.createdAt).toLocaleString('en-CA', { timeZone: 'America/Toronto' })
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.GHL_API_KEY && { 'Authorization': `Bearer ${process.env.GHL_API_KEY}` })
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`GHL notification failed: ${response.status}`);
  }

  console.log(`Order notification sent for order ${order._id}`);
};

module.exports = { sendOrderNotification };
