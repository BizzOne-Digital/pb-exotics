import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { ImageIcon, TrashIcon, PlusIcon, XIcon } from '../../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './AdminProductForm.module.css';

const empty = {
  name: '', category: 'Flower', strain: 'Hybrid', genetics: '',
  thc: '', cbd: '', description: '',
  effects: [], flavours: [], tags: [],
  images: [], pricing: [], contactForPricing: false,
  inStock: true, featured: false
};

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const [newEffect, setNewEffect] = useState('');
  const [newFlavour, setNewFlavour] = useState('');

  const { data: existing } = useQuery({
    queryKey: ['product-edit', id],
    queryFn: () => api.get(`/products/${id}`).then(r => r.data),
    enabled: isEdit
  });

  useEffect(() => {
    if (existing) setForm({ ...empty, ...existing });
  }, [existing]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const saveMutation = useMutation({
    mutationFn: () => isEdit
      ? api.put(`/products/${id}`, form)
      : api.post('/products', form),
    onSuccess: () => {
      qc.invalidateQueries(['admin-products']);
      toast.success(isEdit ? 'Product updated' : 'Product created');
      navigate('/admin/products');
    },
    onError: (e) => toast.error(e.response?.data?.message || 'Save failed')
  });

  // Cloudinary upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('images', f));
      const { data } = await api.post('/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      set('images', [...form.images, ...data.map(d => d.url)]);
      toast.success(`${data.length} image(s) uploaded`);
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) => set('images', form.images.filter(i => i !== url));

  // Pricing rows
  const addPricing = () => set('pricing', [...form.pricing, { size: '', price: '' }]);
  const updatePricing = (i, field, value) => {
    const p = [...form.pricing];
    p[i] = { ...p[i], [field]: field === 'price' ? Number(value) : value };
    set('pricing', p);
  };
  const removePricing = (i) => set('pricing', form.pricing.filter((_, idx) => idx !== i));

  // Tags
  const addEffect = () => { if (newEffect.trim()) { set('effects', [...form.effects, newEffect.trim()]); setNewEffect(''); } };
  const addFlavour = () => { if (newFlavour.trim()) { set('flavours', [...form.flavours, newFlavour.trim()]); setNewFlavour(''); } };

  return (
    <AdminLayout title={isEdit ? 'Edit Product' : 'New Product'}>
      <div className={styles.layout}>
        {/* Left column */}
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Basic Info</h3>
            <div className={styles.field}>
              <label>Product Name *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Pink Runtz" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Category *</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}>
                  {['Flower','Edibles','Concentrates','Vapes','Accessories','Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>Strain Type</label>
                <select value={form.strain} onChange={e => set('strain', e.target.value)}>
                  {['Indica','Sativa','Hybrid','N/A'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Genetics / Cross</label>
              <input value={form.genetics} onChange={e => set('genetics', e.target.value)} placeholder="e.g. Zkittlez x Gelato" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>THC %</label>
                <input value={form.thc} onChange={e => set('thc', e.target.value)} placeholder="e.g. 24-27%" />
              </div>
              <div className={styles.field}>
                <label>CBD %</label>
                <input value={form.cbd} onChange={e => set('cbd', e.target.value)} placeholder="e.g. 0.1%" />
              </div>
            </div>
            <div className={styles.field}>
              <label>Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5} placeholder="Describe the product..." />
            </div>
          </div>

          {/* Effects & Flavours */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Effects & Flavours</h3>
            <div className={styles.tagSection}>
              <label>Effects</label>
              <div className={styles.tagInput}>
                <input value={newEffect} onChange={e => setNewEffect(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addEffect())} placeholder="e.g. Relaxed" />
                <button type="button" onClick={addEffect} className={styles.addTagBtn}><PlusIcon size={16} /></button>
              </div>
              <div className={styles.tagCloud}>
                {form.effects.map(t => (
                  <span key={t} className={styles.tag}>{t} <button onClick={() => set('effects', form.effects.filter(e => e !== t))}><XIcon size={12} /></button></span>
                ))}
              </div>
            </div>
            <div className={styles.tagSection}>
              <label>Flavours</label>
              <div className={styles.tagInput}>
                <input value={newFlavour} onChange={e => setNewFlavour(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFlavour())} placeholder="e.g. Sweet" />
                <button type="button" onClick={addFlavour} className={styles.addTagBtn}><PlusIcon size={16} /></button>
              </div>
              <div className={styles.tagCloud}>
                {form.flavours.map(t => (
                  <span key={t} className={styles.tag}>{t} <button onClick={() => set('flavours', form.flavours.filter(f => f !== t))}><XIcon size={12} /></button></span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Pricing</h3>
            <label className={styles.checkRow}>
              <input type="checkbox" checked={form.contactForPricing} onChange={e => set('contactForPricing', e.target.checked)} />
              <span>Contact for pricing (hides prices publicly)</span>
            </label>
            {!form.contactForPricing && (
              <>
                {form.pricing.map((p, i) => (
                  <div key={i} className={styles.pricingRow}>
                    <div className={styles.field} style={{ flex: 1, marginBottom: 0 }}>
                      <input value={p.size} onChange={e => updatePricing(i, 'size', e.target.value)} placeholder="Size (e.g. HQ, Q, Half Oz, Oz)" />
                    </div>
                    <div className={styles.field} style={{ width: 120, marginBottom: 0 }}>
                      <input type="number" value={p.price} onChange={e => updatePricing(i, 'price', e.target.value)} placeholder="Price $" />
                    </div>
                    <button className={styles.deleteBtn} onClick={() => removePricing(i)}><TrashIcon size={14} /></button>
                  </div>
                ))}
                <button type="button" className="btn btn-outline" style={{ marginTop: 12, padding: '8px 16px', fontSize: '0.8rem' }} onClick={addPricing}>
                  <PlusIcon size={14} /> Add Size
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.sideCol}>
          {/* Images */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Images (Cloudinary)</h3>
            <label className={styles.uploadArea}>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
              <ImageIcon size={28} style={{ color: 'var(--pb-gray)' }} />
              <span>{uploading ? 'Uploading...' : 'Click to upload images'}</span>
              <small>JPG, PNG, WEBP — Max 10MB each</small>
            </label>
            {form.images.length > 0 && (
              <div className={styles.imageGrid}>
                {form.images.map((url, i) => (
                  <div key={i} className={styles.imageThumb}>
                    <img src={url} alt={`Product ${i + 1}`} />
                    <button className={styles.removeImg} onClick={() => removeImage(url)}><XIcon size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Status</h3>
            <label className={styles.checkRow}>
              <input type="checkbox" checked={form.inStock} onChange={e => set('inStock', e.target.checked)} />
              <span>In Stock</span>
            </label>
            <label className={styles.checkRow} style={{ marginTop: 12 }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
              <span>Featured on Homepage</span>
            </label>
          </div>

          {/* Save */}
          <button className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }} onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={() => navigate('/admin/products')}>
            Cancel
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductForm;
