import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import { SearchIcon, ArrowRightIcon, ClockIcon, TruckIcon, PackageIcon, CheckIcon } from '../components/common/Icons';
import styles from './Shop.module.css';
import pricingStyles from './Pricing.module.css';

const flowerTiers = [
  { size: 'HQ', sub: '3.5g', price: 30 },
  { size: 'Q', sub: '7g', price: 55 },
  { size: 'Half Oz', sub: '14g', price: 95 },
  { size: 'Oz', sub: '28g', price: 150 },
];

const deliveryServices = [
  { icon: ClockIcon, title: 'Same Day Delivery', desc: 'Max 1hr 30min wait, or pre-order within a delivery window.', tag: 'Free' },
  { icon: TruckIcon, title: 'Next Day Courier', desc: 'Order today, tracked delivery arrives the next day.', tag: 'Free' },
  { icon: PackageIcon, title: 'Mail Order Shipping', desc: 'Packed and shipped the next morning after payment.', tag: 'Free' },
];

const categories = ['All', 'Flower', 'Edibles', 'Concentrates', 'Vapes', 'Accessories'];
const strains = ['All', 'Indica', 'Sativa', 'Hybrid'];

const Shop = () => {
  const [category, setCategory] = useState('All');
  const [strain, setStrain] = useState('All');
  const [search, setSearch] = useState('');

  const params = {};
  if (category !== 'All') params.category = category;
  if (strain !== 'All') params.strain = strain;
  if (search) params.search = search;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', category, strain, search],
    queryFn: () => api.get('/products', { params }).then(r => r.data)
  });

  return (
    <div style={{ paddingTop: 100 }}>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="section-subtitle">The Menu</p>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Our <span>Products</span></h1>
          <p style={{ color: 'var(--pb-gray)', marginBottom: 40 }}>All pricing shown reflects standard rates. Contact for bulk or specialty requests.</p>

          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.searchWrap}>
              <SearchIcon size={16} style={{ color: 'var(--pb-gray)' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterGroup}>
              {categories.map(c => (
                <button
                  key={c}
                  className={`${styles.filterBtn} ${category === c ? styles.active : ''}`}
                  onClick={() => setCategory(c)}
                >{c}</button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              {strains.map(s => (
                <button
                  key={s}
                  className={`${styles.filterBtn} ${strain === s ? styles.active : ''}`}
                  onClick={() => setStrain(s)}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="loader"><div className="loader-ring" /></div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--pb-gray)' }}>
              No products found for these filters.
            </div>
          ) : (
            <div className={styles.grid}>
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          {/* Pricing & Services */}
          <div style={{ marginTop: 72 }}>
            <h2 className={pricingStyles.groupTitle}>Flower Pricing</h2>
            <div className={pricingStyles.tierGrid}>
              {flowerTiers.map(({ size, sub, price }) => (
                <div key={size} className={pricingStyles.tierCard}>
                  <span className={pricingStyles.tierSize}>{size}</span>
                  <span className={pricingStyles.tierSub}>{sub}</span>
                  <div className={pricingStyles.tierPrice}>${price}</div>
                </div>
              ))}
            </div>
            <p className={pricingStyles.tierNote}>
              Some premium / exotic flower drops may vary — check the product page or contact us for exact pricing.
            </p>

            <h2 className={pricingStyles.groupTitle} style={{ marginTop: 56 }}>Other Categories</h2>
            <div className={pricingStyles.contactBox}>
              <CheckIcon size={22} style={{ color: 'var(--pb-red)', flexShrink: 0 }} />
              <p>Concentrates, vapes, edibles and specialty items are priced individually — <strong>contact for pricing</strong> on any product marked as such.</p>
              <Link to="/contact" className="btn btn-outline" style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                Contact Us <ArrowRightIcon size={16} />
              </Link>
            </div>

            <h2 className={pricingStyles.groupTitle} style={{ marginTop: 56 }}>Delivery & Shipping</h2>
            <div className={pricingStyles.servicesGrid}>
              {deliveryServices.map(({ icon: Icon, title, desc, tag }) => (
                <div key={title} className={pricingStyles.serviceCard}>
                  <div className={pricingStyles.serviceIcon}><Icon size={24} style={{ color: 'var(--pb-red)' }} /></div>
                  <div className={pricingStyles.serviceTag}>{tag}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
