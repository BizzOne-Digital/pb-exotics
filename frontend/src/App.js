import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopOnNavigate from './components/common/ScrollToTopOnNavigate';
import MobileNav from './components/layout/MobileNav';

// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import FAQ from './pages/FAQ';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminGallery from './pages/admin/AdminGallery';
import ProtectedRoute from './components/common/ProtectedRoute';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTopOnNavigate />
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#1a1a1a', color: '#F0EBE0', border: '1px solid rgba(204,0,0,0.3)' },
                success: { iconTheme: { primary: '#CC0000', secondary: '#F0EBE0' } }
              }}
            />
            <Routes>
              {/* Public site */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:slug" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success/:id" element={<OrderSuccess />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
              </Route>

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/:id/edit" element={<AdminProductForm />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="blog/new" element={<AdminBlogForm />} />
                <Route path="blog/:id/edit" element={<AdminBlogForm />} />
                <Route path="gallery" element={<AdminGallery />} />
              </Route>
            </Routes>
            <MobileNav />
            <ScrollToTop />
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
