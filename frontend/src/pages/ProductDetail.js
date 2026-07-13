import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { CartIcon } from '../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './ProductDetail.module.css';

const strainClass = { Indica: 'badge-indica', Sativa: 'badge-sativa', Hybrid: 'badge-hybrid', 'N/A': 'badge-na' };

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.get(`/products/${slug}`).then(r => r.data),
    onSuccess: (p) => { if (p.pricing?.length) setSelectedSize(p.pricing[0]); }
  });

  if (isLoading) return <div style={{ paddingTop: 120 }} className="loader"><div className="loader-ring" /></div>;
  if (!product) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--pb-gray)' }}>Product not found.</div>;

  const activeSize = selectedSize || product.pricing?.[0];

  const handleAdd = () => {
    if (product.contactForPricing || !activeSize) {
      addToCart({ ...product, selectedSize: 'Contact for pricing', selectedPrice: 0 });
      toast.success(`${product.name} added to cart — price to be confirmed`);
      return;
    }
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, selectedSize: activeSize.size, selectedPrice: activeSize.price });
    }
    toast.success(`${product.name} (${activeSize.size}) added to cart`);
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <Link to="/shop" style={{ color: 'var(--pb-gray)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          ← Back to Shop
        </Link>
        <div className={styles.layout}>
          {/* Images */}
          <div className={styles.images}>
            <div className={styles.mainImg}>
              <img
                src={product.images?.[selectedImg] || 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&q=80'}
                alt={product.name}
              />
            </div>
            {product.images?.length > 1 && (
              <div className={styles.thumbs}>
                {product.images.map((img, i) => (
                  <button key={i} className={`${styles.thumb} ${i === selectedImg ? styles.thumbActive : ''}`} onClick={() => setSelectedImg(i)}>
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span className={`badge ${strainClass[product.strain]}`}>{product.strain}</span>
              <span className="badge badge-na">{product.category}</span>
            </div>
            <h1 className={styles.name}>{product.name}</h1>
            {product.genetics && <p className={styles.genetics}>{product.genetics}</p>}
            <div className="red-line" />

            <div className={styles.stats}>
              {product.thc && <div className={styles.stat}><span>THC</span><strong>{product.thc}</strong></div>}
              {product.cbd && <div className={styles.stat}><span>CBD</span><strong>{product.cbd}</strong></div>}
            </div>

            <p className={styles.desc}>{product.description}</p>

            {product.effects?.length > 0 && (
              <div className={styles.tags}>
                <p className={styles.tagLabel}>Effects</p>
                <div className={styles.tagList}>
                  {product.effects.map(e => <span key={e} className={styles.tag}>{e}</span>)}
                </div>
              </div>
            )}

            {product.flavours?.length > 0 && (
              <div className={styles.tags}>
                <p className={styles.tagLabel}>Flavours</p>
                <div className={styles.tagList}>
                  {product.flavours.map(f => <span key={f} className={styles.tag}>{f}</span>)}
                </div>
              </div>
            )}

            {/* Size picker */}
            {!product.contactForPricing && product.pricing?.length > 0 && (
              <div className={styles.sizePicker}>
                <p className={styles.tagLabel}>Select Size</p>
                <div className={styles.sizes}>
                  {product.pricing.map(p => (
                    <button
                      key={p.size}
                      className={`${styles.sizeBtn} ${activeSize?.size === p.size ? styles.sizeBtnActive : ''}`}
                      onClick={() => setSelectedSize(p)}
                    >
                      <span>{p.size}</span>
                      <strong>${p.price}</strong>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.contactForPricing && (
              <div className={styles.contactBox}>
                Price to be confirmed — add to cart and we'll follow up with pricing before delivery.
              </div>
            )}

            {/* Qty + Add */}
            <div className={styles.addRow}>
              {!product.contactForPricing && (
                <div className={styles.qtyControl}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              )}
              <button className="btn btn-red" style={{ flex: 1 }} onClick={handleAdd}>
                <CartIcon size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
