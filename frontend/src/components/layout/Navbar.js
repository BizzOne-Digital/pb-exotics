import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartIcon, MenuIcon, XIcon } from '../common/Icons';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, [menuOpen]);

  // The open mobile menu is a fullscreen overlay rendered inside the header
  // (so the outside-click listener above sees it as "inside"). Closing on a
  // direct click on the overlay background covers that case.
  const closeIfBackground = (e) => {
    if (e.target === e.currentTarget) setMenuOpen(false);
  };

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
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="PB Exotics" className={styles.logoImg} />
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`} onClick={closeIfBackground}>
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
