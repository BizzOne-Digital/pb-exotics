import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { TruckIcon, CheckIcon, TrashIcon } from '../../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './AdminOrderDetail.module.css';

const statuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
const statusColor = {
  Pending: '#f59e0b', Confirmed: '#3b82f6', Preparing: '#8b5cf6',
  'Out for Delivery': '#06b6d4', Delivered: '#10b981', Cancelled: '#ef4444'
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [trackingInput, setTrackingInput] = useState('');

  const { data: order, isLoading } = useQuery({
    queryKey: ['order-detail', id],
    queryFn: () => api.get(`/orders/${id}`).then(r => r.data)
  });

  const updateMutation = useMutation({
    mutationFn: (updates) => api.put(`/orders/${id}`, updates),
    onSuccess: () => {
      qc.invalidateQueries(['order-detail', id]);
      qc.invalidateQueries(['admin-orders']);
      toast.success('Order updated');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/orders/${id}`),
    onSuccess: () => {
      toast.success('Order deleted');
      navigate('/admin/orders');
    }
  });

  if (isLoading) return <AdminLayout title="Order Detail"><div className="loader"><div className="loader-ring" /></div></AdminLayout>;
  if (!order) return <AdminLayout title="Order Detail"><p style={{ color: 'var(--pb-gray)' }}>Order not found.</p></AdminLayout>;

  const deliveryLabel = { 'same-day': 'Same Day Delivery', 'next-day': 'Next Day Courier', 'mail-order': 'Mail Order' };

  return (
    <AdminLayout title={`Order #${order._id.slice(-6).toUpperCase()}`}>
      <div className={styles.layout}>
        {/* Left */}
        <div className={styles.main}>
          {/* Customer */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Customer Info</h3>
            <div className={styles.infoGrid}>
              <div><span>Name</span><strong>{order.customer?.name}</strong></div>
              <div><span>Phone</span><strong>{order.customer?.phone}</strong></div>
              <div><span>Email</span><strong>{order.customer?.email}</strong></div>
              <div>
                <span>Address</span>
                <strong>
                  {[order.customer?.address?.street, order.customer?.address?.city, order.customer?.address?.province, order.customer?.address?.postalCode].filter(Boolean).join(', ')}
                </strong>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Delivery Info</h3>
            <div className={styles.infoGrid}>
              <div><span>Method</span><strong>{deliveryLabel[order.deliveryMethod]}</strong></div>
              {order.deliveryWindow && <div><span>Window</span><strong>{order.deliveryWindow}</strong></div>}
              {order.trackingNumber && <div><span>Tracking #</span><strong style={{ color: 'var(--pb-red)' }}>{order.trackingNumber}</strong></div>}
              {order.notes && <div style={{ gridColumn: '1/-1' }}><span>Notes</span><strong>{order.notes}</strong></div>}
            </div>
            {/* Add tracking */}
            <div className={styles.trackingInput}>
              <input
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value)}
                placeholder="Enter tracking number..."
              />
              <button className="btn btn-red" style={{ padding: '10px 20px', fontSize: '0.875rem' }} onClick={() => updateMutation.mutate({ trackingNumber: trackingInput })}>
                <TruckIcon size={15} /> Save
              </button>
            </div>
          </div>

          {/* Items */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Items</h3>
            {order.items.map((item, i) => (
              <div key={i} className={styles.itemRow}>
                {item.image && <img src={item.image} alt={item.name} />}
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span>{item.size} × {item.quantity}</span>
                </div>
                <strong className={styles.itemTotal}>{item.price > 0 ? `$${(item.price * item.quantity).toFixed(2)}` : 'TBD — contact for pricing'}</strong>
              </div>
            ))}
            <div className={styles.totals}>
              <div className={styles.totalRow}><span>Subtotal</span><span>${order.subtotal?.toFixed(2)}</span></div>
              <div className={styles.totalRow}><span>Delivery</span><span>{order.deliveryFee ? `$${order.deliveryFee.toFixed(2)}` : 'Free'}</span></div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}><span>Total</span><span>${order.total?.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className={styles.side}>
          {/* Status */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Status</h3>
            <div className={styles.currentStatus} style={{ borderColor: `${statusColor[order.status]}44`, background: `${statusColor[order.status]}11` }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor[order.status] }} />
              <strong style={{ color: statusColor[order.status] }}>{order.status}</strong>
            </div>
            <div className={styles.statusButtons}>
              {statuses.map(s => (
                <button
                  key={s}
                  className={`${styles.statusBtn} ${order.status === s ? styles.statusBtnActive : ''}`}
                  style={order.status === s ? { borderColor: statusColor[s], color: statusColor[s] } : {}}
                  onClick={() => updateMutation.mutate({ status: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Payment</h3>
            <p className={styles.payMethod}>Method: <strong>E-Transfer</strong></p>
            <div className={styles.payButtons}>
              {['Pending', 'Paid', 'Refunded'].map(p => (
                <button
                  key={p}
                  className={`${styles.statusBtn} ${order.paymentStatus === p ? styles.statusBtnActive : ''}`}
                  onClick={() => updateMutation.mutate({ paymentStatus: p })}
                >
                  {p === 'Paid' && <CheckIcon size={12} />}
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Meta</h3>
            <div className={styles.meta}>
              <div><span>Placed</span><strong>{new Date(order.createdAt).toLocaleString('en-CA')}</strong></div>
              <div><span>Notification</span><strong>{order.notificationSent ? 'Sent' : 'Not sent'}</strong></div>
            </div>
          </div>

          <button
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', marginTop: 4 }}
            onClick={() => window.confirm('Delete this order?') && deleteMutation.mutate()}
          >
            <TrashIcon size={16} /> Delete Order
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetail;
