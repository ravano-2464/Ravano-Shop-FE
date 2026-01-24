import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LogRocket from 'logrocket';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';
import DashboardMonitoring from './pages/DashboardMonitoring';
import NotFound from './pages/NotFound';

LogRocket.init('xuiyty/ravano-shop');

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#363636',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              success: {
                duration: 3000,
                iconTheme: { primary: '#10b981', secondary: '#fff' },
                style: { border: '1px solid #10b981' },
              },
              error: {
                duration: 4000,
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
                style: { border: '1px solid #ef4444' },
              },
            }}
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/dashboard-monitoring"
                  element={<DashboardMonitoring />}
                />
                <Route path="/list-products" element={<ProductList />} />
                <Route path="/add-products" element={<ProductForm />} />
                <Route path="/edit/products/:id" element={<ProductEdit />} />
                <Route
                  path="/detail-products/:id"
                  element={<ProductDetail />}
                />
              </Route>
            </Route>

            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
