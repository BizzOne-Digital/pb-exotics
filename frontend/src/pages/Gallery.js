import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import styles from './Gallery.module.css';

const Gallery = () => {
  const { data: images = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: () => api.get('/gallery').then(r => r.data)
  });

  return (
    <div style={{ paddingTop: 100 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <p className="section-subtitle">Gallery</p>
          <h1 className="section-title" style={{ marginBottom: 8 }}>The <span>Genetics</span> Menu</h1>
          <p style={{ color: 'var(--pb-gray)', maxWidth: 560, marginBottom: 48 }}>
            A visual look at PB Exotics — drops, product shots, and behind the scenes.
          </p>

          {isLoading ? (
            <div className="loader"><div className="loader-ring" /></div>
          ) : (
            <div className={styles.grid}>
              {images.map(img => (
                <div key={img._id} className={styles.tile}>
                  <img src={img.image} alt={img.caption || 'PB Exotics'} loading="lazy" />
                  {(img.caption || img.category) && (
                    <div className={styles.tileOverlay}>
                      {img.category && <span className={styles.tileCategory}>{img.category}</span>}
                      {img.caption && <strong className={styles.tileName}>{img.caption}</strong>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isLoading && images.length === 0 && (
            <p style={{ color: 'var(--pb-gray)', textAlign: 'center', padding: '40px 0' }}>
              No images to display yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
