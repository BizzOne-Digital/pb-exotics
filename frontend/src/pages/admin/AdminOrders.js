import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import styles from './AdminOrders.module.css';

const statusColor = {
  Pending: '#f59e0b', Confirmed: '#3b82f6', Preparing: '#8b5cf6',
  'Out for Delivery': '#06b6d4', Delivered: '#10b981', Cancelled: '#ef4444'
};
const allStatuses = ['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
const deliveryMethods = ['All', 'same-day', 'next-day', 'mail-order'];

const AdminOrders = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');

  const params = {};
  if (statusFilter !== 'All') params.status = statusFilter;
  if (methodFilter !== 'All') params.deliveryMethod = methodFilter;

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders', statusFilter, methodFilter],
    queryFn: () => api.get('/orders', { params }).then(r => r.data),
    refetchInterval: 15000
  });

  return (
    <AdminLayout title="Orders">
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          {allStatuses.map(s => (
            <button key={s} className={`${styles.filterBtn} ${statusFilter === s ? styles.active : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          {deliveryMethods.map(m => (
            <button key={m} className={`${styles.filterBtn} ${methodFilter === m ? styles.active : ''}`} onClick={() => setMethodFilter(m)}>
              {m === 'All' ? 'All Methods' : m.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="loader"><div className="loader-ring" /></div>
      ) : orders.length === 0 ? (
        <p style={{ color: 'var(--pb-gray)', padding: '40px 0' }}>No orders match these filters.</p>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Order ID</span>
            <span>Customer</span>
            <span>Phone</span>
            <span>Method</span>
            <span>Window</span>
            <span>Total</span>
            <span>Payment</span>
            <span>Status</span>
            <span>Date</span>
            <span></span>
          </div>
          {orders.map(order => (
            <div key={order._id} className={styles.row}>
              <span className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</span>
              <span>{order.customer?.name}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--pb-gray)' }}>{order.customer?.phone}</span>
              <span style={{ textTransform: 'capitalize', fontSize: '0.8rem' }}>{order.deliveryMethod?.replace('-', ' ')}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--pb-gray)' }}>{order.deliveryWindow || '—'}</span>
              <span style={{ fontWeight: 600 }}>${order.total?.toFixed(2)}</span>
              <span>
                <span className={`${styles.payBadge} ${order.paymentStatus === 'Paid' ? styles.paid : ''}`}>
                  {order.paymentStatus}
                </span>
              </span>
              <span>
                <span className={styles.statusDot} style={{ background: statusColor[order.status] }} />
                <span style={{ fontSize: '0.8rem' }}>{order.status}</span>
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--pb-gray)' }}>
                {new Date(order.createdAt).toLocaleDateString('en-CA')}
              </span>
              <Link to={`/admin/orders/${order._id}`} className={styles.viewBtn}>View →</Link>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
