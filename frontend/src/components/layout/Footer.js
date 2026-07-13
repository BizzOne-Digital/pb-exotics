import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon } from '../common/Icons';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="PB Exotics" className={styles.logoImg} />
          <p>Powered by smokers, for smokers. Quality, consistency, and affordability — because it's about more than a price tag.</p>
          <div className={styles.social}>
            <a href="https://instagram.com/pbexoticsinc" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              @pbexoticsinc
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className={styles.col}>
          <h4>More</h4>
          <Link to="/blog">Blog</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <a href="tel:14373297424" className={styles.contactItem}>
            <PhoneIcon size={14} /> 1 (437) 329-7424
          </a>
          <a href="mailto:maze@growiqtech.com" className={styles.contactItem}>
            <MailIcon size={14} /> maze@growiqtech.com
          </a>
          <span className={styles.contactItem}>
            <MapPinIcon size={14} /> pbexotics.ca
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} PB Exotics. All rights reserved.</p>
        <p className={styles.disclaimer}>For adults 19+ only. Please consume responsibly.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
