import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loader"><div className="loader-ring" /></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
