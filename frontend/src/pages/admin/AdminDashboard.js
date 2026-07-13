import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { DollarIcon, OrdersIcon, TruckIcon, ClockIcon, ArrowRightIcon } from '../../components/common/Icons';
import styles from './AdminDashboard.module.css';

const statusColor = {
  Pending: '#f59e0b',
  Confirmed: '#3b82f6',
  Preparing: '#8b5cf6',
  'Out for Delivery': '#06b6d4',
  Delivered: '#10b981',
  Cancelled: '#ef4444'
};

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/orders/stats').then(r => r.data),
    refetchInterval: 30000 // auto-refresh every 30s
  });

  const statCards = [
    { icon: OrdersIcon, label: 'Total Orders', value: stats?.totalOrders ?? '—', sub: 'All time' },
    { icon: ClockIcon, label: 'Pending Orders', value: stats?.pendingOrders ?? '—', sub: 'Needs action', alert: stats?.pendingOrders > 0 },
    { icon: TruckIcon, label: "Today's Orders", value: stats?.todayOrders ?? '—', sub: 'Last 24 hours' },
    { icon: DollarIcon, label: 'Revenue (Paid)', value: stats?.revenue ? `$${stats.revenue.toFixed(2)}` : '—', sub: 'Confirmed payments' },
  ];

  return (
    <AdminLayout title="Dashboard">
      {isLoading ? (
        <div className="loader"><div className="loader-ring" /></div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            {statCards.map(({ icon: Icon, label, value, sub, alert }) => (
              <div key={label} className={`${styles.statCard} ${alert ? styles.alert : ''}`}>
                <div className={styles.statIcon}>
                  <Icon size={20} style={{ color: alert ? 'var(--pb-red)' : 'var(--pb-red)' }} />
                </div>
                <div>
                  <p className={styles.statLabel}>{label}</p>
                  <p className={styles.statValue}>{value}</p>
                  <p className={styles.statSub}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                View All <ArrowRightIcon size={14} />
              </Link>
            </div>
            {stats?.recentOrders?.length ? (
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Method</span>
                  <span>Total</span>
                  <span>Status</span>
                  <span></span>
                </div>
                {stats.recentOrders.map(order => (
                  <div key={order._id} className={styles.tableRow}>
                    <span className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</span>
                    <span>{order.customer?.name}</span>
                    <span style={{ textTransform: 'capitalize' }}>{order.deliveryMethod?.replace('-', ' ')}</span>
                    <span>${order.total?.toFixed(2)}</span>
                    <span>
                      <span className={styles.statusBadge} style={{ background: `${statusColor[order.status]}22`, color: statusColor[order.status], border: `1px solid ${statusColor[order.status]}44` }}>
                        {order.status}
                      </span>
                    </span>
                    <Link to={`/admin/orders/${order._id}`} style={{ color: 'var(--pb-red)', fontSize: '0.8rem' }}>
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--pb-gray)', padding: '24px 0' }}>No orders yet.</p>
            )}
          </div>

          <div className={styles.quickLinks}>
            <Link to="/admin/products/new" className="btn btn-red">+ Add Product</Link>
            <Link to="/admin/orders" className="btn btn-outline">Manage Orders</Link>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
