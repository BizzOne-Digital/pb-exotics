import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import styles from './BlogDetail.module.css';

const BlogDetail = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => api.get(`/posts/${slug}`).then(r => r.data)
  });

  if (isLoading) return <div style={{ paddingTop: 120 }} className="loader"><div className="loader-ring" /></div>;
  if (!post) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--pb-gray)' }}>Post not found.</div>;

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 780 }}>
        <Link to="/blog" style={{ color: 'var(--pb-gray)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          ← Back to Blog
        </Link>
        <span className={styles.tag}>{post.tag}</span>
        <h1 className={styles.title}>{post.title}</h1>
        {post.image && (
          <div className={styles.imgWrap}>
            <img src={post.image} alt={post.title} />
          </div>
        )}
        <p className={styles.excerpt}>{post.excerpt}</p>
        {post.content && <div className={styles.content}>{post.content}</div>}
      </div>
    </div>
  );
};

export default BlogDetail;
