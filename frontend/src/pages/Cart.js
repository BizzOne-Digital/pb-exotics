import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, ArrowRightIcon } from '../components/common/Icons';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart, updateQty, subtotal, clearCart } = useCart();
  const hasTbdItems = cart.some(i => i.selectedPrice === 0);

  if (!cart.length) return (
    <div style={{ paddingTop: 120, textAlign: 'center', paddingBottom: 80 }}>
      <p style={{ color: 'var(--pb-gray)', marginBottom: 24, fontSize: '1.1rem' }}>Your cart is empty.</p>
      <Link to="/shop" className="btn btn-red">Browse Products <ArrowRightIcon size={18} /></Link>
    </div>
  );

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <h1 className="section-title">Your <span>Cart</span></h1>
          <button onClick={clearCart} style={{ color: 'var(--pb-gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', background: 'none', border: 'none' }}>
            Clear Cart
          </button>
        </div>
        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map((item) => (
              <div key={`${item._id}-${item.selectedSize}`} className={styles.item}>
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=70'}
                  alt={item.name}
                />
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <span className={styles.size}>{item.selectedSize}</span>
                  <p className={styles.price}>{item.selectedPrice > 0 ? `$${item.selectedPrice} each` : 'Contact for pricing'}</p>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.qty}>
                    <button onClick={() => updateQty(item._id, item.selectedSize, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, item.selectedSize, item.quantity + 1)}>+</button>
                  </div>
                  <strong className={styles.lineTotal}>{item.selectedPrice > 0 ? `$${(item.selectedPrice * item.quantity).toFixed(2)}` : 'TBD'}</strong>
                  <button className={styles.remove} onClick={() => removeFromCart(item._id, item.selectedSize)}>
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div className={styles.summaryRow}><span>Delivery</span><strong>TBD</strong></div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow} style={{ fontSize: '1.1rem' }}><span>Estimated Total</span><strong style={{ color: 'var(--pb-red)' }}>${subtotal.toFixed(2)}{hasTbdItems ? '+' : ''}</strong></div>
            {hasTbdItems && <p className={styles.payNote}>Some items are priced on request — we'll confirm the total before delivery.</p>}
            <p className={styles.payNote}>Payment via E-Transfer after order is confirmed.</p>
            <Link to="/checkout" className="btn btn-red" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
              Proceed to Checkout <ArrowRightIcon size={18} />
            </Link>
            <Link to="/shop" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
