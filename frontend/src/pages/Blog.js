import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowRightIcon } from '../components/common/Icons';
import styles from './Blog.module.css';

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.get('/posts').then(r => r.data)
  });

  return (
    <div style={{ paddingTop: 100 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <p className="section-subtitle">News & Updates</p>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Blog</h1>
          <p style={{ color: 'var(--pb-gray)', maxWidth: 560, marginBottom: 48 }}>
            Drops, deals, vendor info and everything happening at PB Exotics.
          </p>

          {isLoading ? (
            <div className="loader"><div className="loader-ring" /></div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--pb-gray)' }}>
              No posts yet — check back soon.
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <article key={post._id} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <img src={post.image || '/news.png'} alt={post.title} loading="lazy" />
                    <span className={styles.tag}>{post.tag}</span>
                  </div>
                  <div className={styles.body}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                      Read More <ArrowRightIcon size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
