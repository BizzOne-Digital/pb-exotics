import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartIcon } from './Icons';
import toast from 'react-hot-toast';
import styles from './ProductCard.module.css';

const strainClass = { Indica: 'badge-indica', Sativa: 'badge-sativa', Hybrid: 'badge-hybrid', 'N/A': 'badge-na' };

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const lowestPrice = product.pricing?.reduce((min, p) => p.price < min ? p.price : min, Infinity);
  const hasPrice = !product.contactForPricing && product.pricing?.length;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (product.contactForPricing || !product.pricing?.length) {
      addToCart({ ...product, selectedSize: 'Contact for pricing', selectedPrice: 0 });
      toast.success(`${product.name} added to cart — price to be confirmed`);
      return;
    }
    const first = product.pricing[0];
    addToCart({ ...product, selectedSize: first.size, selectedPrice: first.price });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/shop/${product.slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={product.images?.[0] || `https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600&q=80`}
          alt={product.name}
          loading="lazy"
        />
        {product.featured && <span className={styles.featured}>Featured</span>}
        {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
        <button className={styles.quickAdd} onClick={handleQuickAdd} title="Quick add">
          <CartIcon size={16} />
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={`badge ${strainClass[product.strain] || 'badge-na'}`}>{product.strain}</span>
          <span className={styles.category}>{product.category}</span>
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        {product.genetics && <p className={styles.genetics}>{product.genetics}</p>}
        <div className={styles.footer}>
          {hasPrice ? (
            <span className={styles.price}>
              From <strong>${lowestPrice}</strong>
            </span>
          ) : (
            <span className={styles.contactPrice}>Contact for pricing</span>
          )}
          {product.thc && <span className={styles.thc}>THC {product.thc}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
