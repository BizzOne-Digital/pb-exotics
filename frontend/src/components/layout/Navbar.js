import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartIcon, MenuIcon, XIcon } from '../common/Icons';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="PB Exotics" className={styles.logoImg} />
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? styles.active : ''}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/cart" className={styles.cartBtn}>
            <CartIcon size={20} />
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </Link>
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
