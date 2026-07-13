import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, ShopIcon, GridIcon, CartIcon } from '../common/Icons';
import { useCart } from '../../context/CartContext';

const MobileNav = () => {
  const { itemCount } = useCart();
  const location = useLocation();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > 120);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const items = [
    { to: '/', label: 'Home', icon: HomeIcon, exact: true },
    { to: '/shop', label: 'Shop', icon: ShopIcon },
    { to: '/gallery', label: 'Gallery', icon: GridIcon },
    { to: '/cart', label: 'Cart', icon: CartIcon, badge: itemCount },
  ];

  return (
    <nav className={`mobile-nav${revealed ? ' revealed' : ''}`}>
      <div className="mobile-nav-inner">
        {items.map(({ to, label, icon: Icon, exact, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
            style={{ position: 'relative' }}
          >
            <Icon size={22} />
            {badge > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 8,
                background: 'var(--pb-red)', color: '#fff',
                width: 16, height: 16, borderRadius: '50%',
                fontSize: '0.6rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{badge}</span>
            )}
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
