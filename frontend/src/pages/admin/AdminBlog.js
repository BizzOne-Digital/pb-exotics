import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { EditIcon, TrashIcon, PlusIcon } from '../../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './AdminProducts.module.css';

const AdminBlog = () => {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => api.get('/posts?all=true').then(r => r.data)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(['admin-posts']);
      toast.success('Post deleted');
    },
    onError: () => toast.error('Failed to delete post')
  });

  const togglePublished = useMutation({
    mutationFn: ({ id, published }) => api.put(`/posts/${id}`, { published }),
    onSuccess: () => qc.invalidateQueries(['admin-posts'])
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout title="Blog">
      <div className={styles.toolbar}>
        <p style={{ color: 'var(--pb-gray)', fontSize: '0.875rem' }}>{posts.length} posts total</p>
        <Link to="/admin/blog/new" className="btn btn-red">
          <PlusIcon size={16} /> New Post
        </Link>
      </div>

      {isLoading ? (
        <div className="loader"><div className="loader-ring" /></div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHead} style={{ gridTemplateColumns: '2fr 120px 140px 100px' }}>
            <span>Post</span>
            <span>Tag</span>
            <span>Published</span>
            <span>Actions</span>
          </div>
          {posts.map(p => (
            <div key={p._id} className={styles.row} style={{ gridTemplateColumns: '2fr 120px 140px 100px' }}>
              <div className={styles.productCell}>
                <img
                  src={p.image || '/news.png'}
                  alt={p.title}
                />
                <div>
                  <strong>{p.title}</strong>
                </div>
              </div>
              <span><span className="badge badge-na">{p.tag}</span></span>
              <span>
                <button
                  className={`${styles.toggle} ${p.published ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => togglePublished.mutate({ id: p._id, published: !p.published })}
                >
                  {p.published ? 'Published' : 'Draft'}
                </button>
              </span>
              <span className={styles.actions}>
                <Link to={`/admin/blog/${p._id}/edit`} className={styles.editBtn}>
                  <EditIcon size={15} />
                </Link>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p._id, p.title)}>
                  <TrashIcon size={15} />
                </button>
              </span>
            </div>
          ))}
          {posts.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--pb-gray)' }}>
              No posts yet — create your first one.
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlog;
