import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { ImageIcon, XIcon } from '../../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './AdminGallery.module.css';

const AdminGallery = () => {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: () => api.get('/gallery').then(r => r.data)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/gallery/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(['admin-gallery']);
      qc.invalidateQueries(['gallery']);
      toast.success('Image deleted');
    },
    onError: () => toast.error('Failed to delete image')
  });

  const createMutation = useMutation({
    mutationFn: (payload) => api.post('/gallery', payload),
    onSuccess: () => {
      qc.invalidateQueries(['admin-gallery']);
      qc.invalidateQueries(['gallery']);
      toast.success('Image added to gallery');
      setCaption('');
      setCategory('');
    },
    onError: () => toast.error('Failed to add image')
  });

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('images', f));
      const { data } = await api.post('/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      for (const d of data) {
        await createMutation.mutateAsync({ image: d.url, caption, category });
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this image from the gallery?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <AdminLayout title="Gallery">
      <div className={styles.uploadCard}>
        <div className={styles.uploadRow}>
          <input
            type="text"
            placeholder="Caption (optional)"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            className={styles.textInput}
          />
          <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={styles.textInput}
          />
        </div>
        <label className={styles.uploadArea}>
          <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} />
          <ImageIcon size={28} style={{ color: 'var(--pb-gray)' }} />
          <span>{uploading ? 'Uploading...' : 'Click to upload gallery images'}</span>
          <small>JPG, PNG, WEBP — Max 10MB each. Set caption/category above before uploading.</small>
        </label>
      </div>

      {isLoading ? (
        <div className="loader"><div className="loader-ring" /></div>
      ) : (
        <div className={styles.grid}>
          {images.map(img => (
            <div key={img._id} className={styles.tile}>
              <img src={img.image} alt={img.caption || 'Gallery'} />
              <button className={styles.removeBtn} onClick={() => handleDelete(img._id)}>
                <XIcon size={14} />
              </button>
              {(img.caption || img.category) && (
                <div className={styles.tileInfo}>
                  {img.category && <span className={styles.category}>{img.category}</span>}
                  {img.caption && <strong>{img.caption}</strong>}
                </div>
              )}
            </div>
          ))}
          {images.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--pb-gray)', gridColumn: '1 / -1' }}>
              No gallery images yet — upload your first one above.
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
