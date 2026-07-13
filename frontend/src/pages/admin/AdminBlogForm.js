import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { ImageIcon, XIcon } from '../../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './AdminProductForm.module.css';

const empty = {
  title: '', tag: 'News', excerpt: '', content: '', image: '', published: true
};

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);

  const { data: existing } = useQuery({
    queryKey: ['post-edit', id],
    queryFn: () => api.get(`/posts/${id}`).then(r => r.data),
    enabled: isEdit
  });

  useEffect(() => {
    if (existing) setForm({ ...empty, ...existing });
  }, [existing]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const saveMutation = useMutation({
    mutationFn: () => isEdit
      ? api.put(`/posts/${id}`, form)
      : api.post('/posts', form),
    onSuccess: () => {
      qc.invalidateQueries(['admin-posts']);
      toast.success(isEdit ? 'Post updated' : 'Post created');
      navigate('/admin/blog');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Save failed')
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post('/upload/single', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      set('image', data.url);
      toast.success('Image uploaded');
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout title={isEdit ? 'Edit Post' : 'New Post'}>
      <div className={styles.layout}>
        {/* Left column */}
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Post Details</h3>
            <div className={styles.field}>
              <label>Title *</label>
              <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Welcome To The Beginning" />
            </div>
            <div className={styles.field}>
              <label>Tag</label>
              <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="e.g. News, Guide, Launch" />
            </div>
            <div className={styles.field}>
              <label>Excerpt *</label>
              <textarea required value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} placeholder="Short summary shown on the blog list..." />
            </div>
            <div className={styles.field}>
              <label>Content</label>
              <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={10} placeholder="Full post content..." />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.sideCol}>
          {/* Image */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Cover Image</h3>
            <label className={styles.uploadArea}>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              <ImageIcon size={28} style={{ color: 'var(--pb-gray)' }} />
              <span>{uploading ? 'Uploading...' : 'Click to upload image'}</span>
              <small>JPG, PNG, WEBP — Max 10MB</small>
            </label>
            {form.image && (
              <div className={styles.imageGrid}>
                <div className={styles.imageThumb}>
                  <img src={form.image} alt="Cover" />
                  <button className={styles.removeImg} onClick={() => set('image', '')}><XIcon size={14} /></button>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Status</h3>
            <label className={styles.checkRow}>
              <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
              <span>Published</span>
            </label>
          </div>

          {/* Save */}
          <button className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }} onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
          </button>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={() => navigate('/admin/blog')}>
            Cancel
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogForm;
