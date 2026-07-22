import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import Carousel from '../components/common/Carousel';
import { ArrowRightIcon, TruckIcon, ClockIcon, PackageIcon, CheckIcon } from '../components/common/Icons';
import styles from './Home.module.css';

const shopCategories = [
  { title: 'Flower', desc: 'Artisanal strains, hand-picked for potency and flavour', to: '/shop?category=Flower', img: '/img1.png' },
  { title: 'Concentrates', desc: 'Premium wax, shatter, and live resin extracts', to: '/shop?category=Concentrates', img: '/img2.png' },
  { title: 'Edibles', desc: 'Precisely dosed chocolates, gummies, and infused treats', to: '/shop?category=Edibles', img: '/img3.png' },
  { title: 'Vapes', desc: 'Carts and disposables, tested and trusted', to: '/shop?category=Vapes',img: '/img4.png' },
  { title: 'Accessories', desc: 'Smoking and vaping gear', to: '/shop?category=Accessories',img: '/img5.png' },
  { title: 'Sativa', desc: 'Energizing and uplifting', to: '/shop?strain=Sativa',img: '/img6.png' },
  { title: 'Indica', desc: 'Relaxing and sedating', to: '/shop?strain=Indica',img: '/img7.png' },
  { title: 'Hybrid', desc: 'Balanced and versatile', to: '/shop?strain=Hybrid',img: '/img8.png' },
];

const deliveryFeatures = [
  { icon: ClockIcon, t: 'Fast Delivery', s: 'Same day service' },
  { icon: TruckIcon, t: '$5 Delivery Fee', s: 'Free over minimum order' },
  { icon: PackageIcon, t: 'Discreet', s: 'Plain packaging' },
  { icon: CheckIcon, t: '19+ Verified', s: 'ID required at door' },
];

const Home = () => {
  const { data: featured = [] } = useQuery({
    queryKey: ['featured'],
    queryFn: () => api.get('/products?featured=true').then(r => r.data)
  });

  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 100%), url(${process.env.PUBLIC_URL}/hero2.png)` }}
        />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className="section-subtitle">Welcome to the beginning</p>
            <h1 className={styles.heroTitle}>
              PB <span>EXOTICS</span>
            </h1>
            <div className="red-line" />
            <p className={styles.heroText}>
              After years of preparation — we're proud to launch the newest lifestyle brand built on quality, consistency, and affordability. Powered by smokers, for smokers.
            </p>
            <div className={styles.heroBtns}>
              <Link to="/shop" className="btn btn-red">
                Shop Now <ArrowRightIcon size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>
          <div className={styles.heroStrip}>
            {[
              { icon: TruckIcon, label: 'Same Day Delivery', sub: '3 windows available daily' },
              { icon: ClockIcon, label: 'Next Day Courier', sub: 'Tracking provided the next day' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className={styles.heroStripItem}>
                <Icon size={22} style={{ color: 'var(--pb-red)', flexShrink: 0 }} />
                <div>
                  <strong>{label}</strong>
                  <span>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <p className="section-subtitle">Handpicked</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
              <h2 className="section-title">Featured <span>Drops</span></h2>
              <Link to="/shop" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                View All <ArrowRightIcon size={16} />
              </Link>
            </div>
            <Carousel>
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </Carousel>
          </div>
        </section>
      )}

      {/* Shop By Category */}
      <section className="section">
        <div className="container">
          <p className="section-subtitle">Browse</p>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Shop By <span>Category</span></h2>
          <Carousel>
            {shopCategories.map(({ title, desc, to, img }) => (
              <Link
                key={title}
                to={to}
                className={styles.categoryTile}
                style={img ? { backgroundImage: `url(${process.env.PUBLIC_URL}${img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              >
                <div className={styles.categoryTileOverlay} />
                <div className={styles.categoryTileText}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Delivery Info */}
      <section className={styles.aboutStrip}>
        <div className="container">
          <div className={styles.aboutInner}>
            <div className={styles.aboutText}>
              <p className="section-subtitle">Fast & Discreet</p>
              <h2 className="section-title">Premium Delivery<br /><span>To Your Door</span></h2>
              <div className="red-line" />
              <p>Serving Brampton, Mississauga and surrounding areas. Free delivery on qualifying orders.</p>
              <Link to="/shop" className="btn btn-red" style={{ marginTop: 24 }}>
                Check Delivery Area <ArrowRightIcon size={18} />
              </Link>
            </div>
            <div className={styles.deliveryFeatureGrid}>
              {deliveryFeatures.map(({ icon: Icon, t, s }) => (
                <div key={t} className={styles.deliveryFeatureCard}>
                  <Icon size={24} style={{ color: 'var(--pb-red)' }} />
                  <strong>{t}</strong>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Windows CTA */}
      <section className={styles.deliveryCta}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 12 }}>
            Same Day <span>Delivery</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--pb-gray)', marginBottom: 40 }}>
            Pick your window — we deliver to your door.
          </p>
          <div className={styles.windowsGrid}>
            {[
              { window: '10AM – 2PM', label: 'Morning Window' },
              { window: '2PM – 6PM', label: 'Afternoon Window' },
              { window: '6PM – 10PM', label: 'Evening Window' },
            ].map(({ window, label }) => (
              <div key={window} className={styles.windowCard}>
                <ClockIcon size={28} style={{ color: 'var(--pb-red)' }} />
                <strong>{window}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/shop" className="btn btn-red">
              Order Now <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
