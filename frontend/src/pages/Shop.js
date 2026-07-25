import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import { SearchIcon } from '../components/common/Icons';
import styles from './Shop.module.css';

const categories = ['All', 'Flower', 'Edibles', 'Concentrates', 'Vapes', 'Accessories'];
const strains = ['All', 'Indica', 'Sativa', 'Hybrid'];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = categories.includes(searchParams.get('category')) ? searchParams.get('category') : 'All';
  const initialStrain = strains.includes(searchParams.get('strain')) ? searchParams.get('strain') : 'All';
  const [category, setCategory] = useState(initialCategory);
  const [strain, setStrain] = useState(initialStrain);
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
            <div className={styles.filterGroup}>
              <button
                className={`${styles.filterBtn} ${category === 'All' && strain === 'All' ? styles.active : ''}`}
                onClick={() => { setCategory('All'); setStrain('All'); }}
              >All</button>
              {categories.slice(1).map(c => (
                <button
                  key={c}
                  className={`${styles.filterBtn} ${category === c ? styles.active : ''}`}
                  onClick={() => { setCategory(c); setStrain('All'); }}
                >{c}</button>
              ))}
              {strains.slice(1).map(s => (
                <button
                  key={s}
                  className={`${styles.filterBtn} ${strain === s ? styles.active : ''}`}
                  onClick={() => { setStrain(s); setCategory('All'); }}
                >{s}</button>
              ))}
            </div>
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
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="loader"><div className="loader-ring" /></div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--pb-gray)' }}>
              No products found for these filters.
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
