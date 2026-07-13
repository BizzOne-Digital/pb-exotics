import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import styles from './Checkout.module.css';

const windows = ['10am – 2pm', '2pm – 6pm', '6pm – 10pm'];

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    street: '', city: '', province: 'Ontario', postalCode: '',
    deliveryMethod: location.state?.deliveryMethod || 'same-day',
    deliveryWindow: location.state?.deliveryWindow || windows[0],
    notes: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) return;
    setLoading(true);
    try {
      const orderItems = cart.map(i => ({
        product: i._id, name: i.name, image: i.images?.[0],
        size: i.selectedSize, price: i.selectedPrice, quantity: i.quantity
      }));
      const { data } = await api.post('/orders', {
        customer: { name: form.name, email: form.email, phone: form.phone, address: { street: form.street, city: form.city, province: form.province, postalCode: form.postalCode } },
        items: orderItems,
        deliveryMethod: form.deliveryMethod,
        deliveryWindow: form.deliveryMethod === 'same-day' ? form.deliveryWindow : null,
        notes: form.notes,
        subtotal,
        deliveryFee: 0,
        total: subtotal
      });
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <h1 className="section-title" style={{ marginBottom: 40 }}>Check<span>out</span></h1>
        <form onSubmit={handleSubmit} className={styles.layout}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionHead}>Contact Info</h3>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
              </div>
              <div className={styles.field}>
                <label>Phone *</label>
                <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Your phone number" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Email *</label>
              <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
            </div>

            <h3 className={styles.sectionHead} style={{ marginTop: 32 }}>Delivery Address</h3>
            <div className={styles.field}>
              <label>Street Address *</label>
              <input required value={form.street} onChange={e => set('street', e.target.value)} placeholder="123 Main St" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>City *</label>
                <input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="City" />
              </div>
              <div className={styles.field}>
                <label>Postal Code *</label>
                <input required value={form.postalCode} onChange={e => set('postalCode', e.target.value)} placeholder="M1A 2B3" />
              </div>
            </div>

            <h3 className={styles.sectionHead} style={{ marginTop: 32 }}>Delivery Method</h3>
            <div className={styles.deliveryOptions}>
              {[
                { value: 'same-day', label: 'Same Day Delivery', sub: 'Choose a delivery window below' },
                { value: 'next-day', label: 'Next Day Courier', sub: 'Tracking provided once confirmed' },
                { value: 'mail-order', label: 'Mail Order', sub: 'Shipped next morning after E-Transfer' },
              ].map(({ value, label, sub }) => (
                <label key={value} className={`${styles.deliveryOption} ${form.deliveryMethod === value ? styles.selected : ''}`}>
                  <input type="radio" name="delivery" value={value} checked={form.deliveryMethod === value} onChange={() => set('deliveryMethod', value)} />
                  <div>
                    <strong>{label}</strong>
                    <span>{sub}</span>
                  </div>
                </label>
              ))}
            </div>

            {form.deliveryMethod === 'same-day' && (
              <div className={styles.field} style={{ marginTop: 16 }}>
                <label>Delivery Window *</label>
                <select value={form.deliveryWindow} onChange={e => set('deliveryWindow', e.target.value)}>
                  {windows.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            )}

            <div className={styles.field} style={{ marginTop: 24 }}>
              <label>Order Notes (optional)</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any special instructions..." rows={3} />
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.summary}>
            <h2>Your Order</h2>
            {cart.map(i => (
              <div key={`${i._id}-${i.selectedSize}`} className={styles.orderItem}>
                <span>{i.name} ({i.selectedSize}) × {i.quantity}</span>
                <strong>{i.selectedPrice > 0 ? `$${(i.selectedPrice * i.quantity).toFixed(2)}` : 'TBD'}</strong>
              </div>
            ))}
            <div className={styles.divider} />
            <div className={styles.orderItem}>
              <span>Total</span>
              <strong style={{ color: 'var(--pb-red)', fontSize: '1.1rem' }}>${subtotal.toFixed(2)}</strong>
            </div>
            <div className={styles.payInfo}>
              <strong>Payment: E-Transfer</strong>
              <p>After placing your order, you will receive E-Transfer instructions. Order is confirmed once payment is received.</p>
            </div>
            <button type="submit" className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
