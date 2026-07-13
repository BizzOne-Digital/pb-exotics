import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role !== 'admin') {
        toast.error('Admin access required.');
        return;
      }
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoRed}>PB</span>
          <span>EXOTICS</span>
        </div>
        <p className={styles.sub}>Admin Portal</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="admin@pbexotics.ca"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
