import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { EditIcon, TrashIcon, PlusIcon } from '../../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
  const qc = useQueryClient();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.get('/products').then(r => r.data)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(['admin-products']);
      toast.success('Product deleted');
    },
    onError: () => toast.error('Failed to delete product')
  });

  const toggleStock = useMutation({
    mutationFn: ({ id, inStock }) => api.put(`/products/${id}`, { inStock }),
    onSuccess: () => qc.invalidateQueries(['admin-products'])
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout title="Products">
      <div className={styles.toolbar}>
        <p style={{ color: 'var(--pb-gray)', fontSize: '0.875rem' }}>{products.length} products total</p>
        <Link to="/admin/products/new" className="btn btn-red">
          <PlusIcon size={16} /> Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="loader"><div className="loader-ring" /></div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Product</span>
            <span>Category</span>
            <span>Strain</span>
            <span>Pricing</span>
            <span>Stock</span>
            <span>Featured</span>
            <span>Actions</span>
          </div>
          {products.map(p => (
            <div key={p._id} className={styles.row}>
              <div className={styles.productCell}>
                <img
                  src={p.images?.[0] || 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=100&q=60'}
                  alt={p.name}
                />
                <div>
                  <strong>{p.name}</strong>
                  {p.genetics && <span className={styles.genetics}>{p.genetics}</span>}
                </div>
              </div>
              <span><span className="badge badge-na">{p.category}</span></span>
              <span className={`badge badge-${p.strain?.toLowerCase()}`}>{p.strain}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--pb-gray)' }}>
                {p.contactForPricing ? 'Contact' : p.pricing?.length ? `From $${Math.min(...p.pricing.map(x => x.price))}` : '—'}
              </span>
              <span>
                <button
                  className={`${styles.toggle} ${p.inStock ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => toggleStock.mutate({ id: p._id, inStock: !p.inStock })}
                >
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </button>
              </span>
              <span>
                <button
                  className={`${styles.toggle} ${p.featured ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => api.put(`/products/${p._id}`, { featured: !p.featured }).then(() => qc.invalidateQueries(['admin-products']))}
                >
                  {p.featured ? 'Yes' : 'No'}
                </button>
              </span>
              <span className={styles.actions}>
                <Link to={`/admin/products/${p._id}/edit`} className={styles.editBtn}>
                  <EditIcon size={15} />
                </Link>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p._id, p.name)}>
                  <TrashIcon size={15} />
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
