import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import Carousel from '../components/common/Carousel';
import { ArrowRightIcon, TruckIcon, ClockIcon, LeafIcon, CheckIcon } from '../components/common/Icons';
import styles from './Home.module.css';

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
              { icon: ClockIcon, label: 'Next Day Courier', sub: 'Tracking from day of order' },
              { icon: LeafIcon, label: 'Premium Quality', sub: 'Every drop meets our standard' },
              { icon: CheckIcon, label: 'E-Transfer Only', sub: 'Simple, secure, fast' },
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

      {/* About Blurb */}
      <section className={styles.aboutStrip}>
        <div className="container">
          <div className={styles.aboutInner}>
            <div className={styles.aboutText}>
              <p className="section-subtitle">The Brand</p>
              <h2 className="section-title">More Than A<br /><span>Price Tag</span></h2>
              <div className="red-line" />
              <p>Our dedicated team works tirelessly to ensure all products meet company standards while keeping costs accessible. We are a brand powered by the community — and we honour that every single drop.</p>
              <Link to="/about" className="btn btn-red" style={{ marginTop: 24 }}>
                Read Our Story <ArrowRightIcon size={18} />
              </Link>
            </div>
            <div className={styles.aboutImg}>
              <img src="/home.png" alt="PB Exotics Quality" />
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
