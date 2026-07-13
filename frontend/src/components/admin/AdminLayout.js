import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  DashboardIcon, GridIcon, OrdersIcon, LogoutIcon, ImageIcon
} from '../common/Icons';
import styles from './AdminLayout.module.css';

const navItems = [
  { to: '/admin/dashboard', icon: DashboardIcon, label: 'Dashboard' },
  { to: '/admin/products', icon: GridIcon, label: 'Products' },
  { to: '/admin/orders', icon: OrdersIcon, label: 'Orders' },
  { to: '/admin/blog', icon: ImageIcon, label: 'Blog' },
  { to: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
];

const AdminLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <span className={styles.brandRed}>PB</span>
            <span>ADMIN</span>
          </div>
          <nav className={styles.nav}>
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className={styles.sidebarBottom}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogoutIcon size={16} />
            Logout
          </button>
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
