import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { CheckIcon, TruckIcon, ArrowRightIcon } from '../components/common/Icons';
import styles from './OrderSuccess.module.css';

const OrderSuccess = () => {
  const { id } = useParams();
  const { data: order } = useQuery({
    queryKey: ['order', id],
    queryFn: () => api.get(`/orders/${id}`).then(r => r.data),
    retry: false
  });

  const deliveryLabel = {
    'same-day': 'Same Day Delivery',
    'next-day': 'Next Day Courier',
    'mail-order': 'Mail Order'
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <CheckIcon size={36} style={{ color: 'white' }} />
          </div>
          <h1 className={styles.title}>Order Placed!</h1>
          <p className={styles.sub}>
            Thank you for your order. We've received it and will confirm shortly via phone or email.
          </p>

          {order && (
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span>Order ID</span>
                <strong>{order._id.slice(-8).toUpperCase()}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>Delivery Method</span>
                <strong>{deliveryLabel[order.deliveryMethod]}</strong>
              </div>
              {order.deliveryWindow && (
                <div className={styles.detailRow}>
                  <span>Delivery Window</span>
                  <strong>{order.deliveryWindow}</strong>
                </div>
              )}
              <div className={styles.detailRow}>
                <span>Total</span>
                <strong style={{ color: 'var(--pb-red)' }}>${order.total?.toFixed(2)}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>Payment</span>
                <strong>E-Transfer (pending)</strong>
              </div>
            </div>
          )}

          <div className={styles.payNote}>
            <TruckIcon size={20} style={{ color: 'var(--pb-red)', flexShrink: 0 }} />
            <p>
              Send your E-Transfer to the number on file once you receive our confirmation.
              Your order will be dispatched after payment is confirmed.
            </p>
          </div>

          <div className={styles.actions}>
            <Link to="/shop" className="btn btn-red">
              Continue Shopping <ArrowRightIcon size={18} />
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
