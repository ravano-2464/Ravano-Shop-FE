import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import {
  ShoppingCart,
  Wallet,
  Plus,
  X,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../hooks/Auth/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../hooks/Cart/useCart';
import CartModal from './CartModal';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import TopUpModal from './TopUpModal';

const useStyles = createUseStyles({
  navbar: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #E5E7EB',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: '73px',
    transition: 'all 0.3s ease',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#111827',
    letterSpacing: '-0.025em',
  },
  brandIcon: { fontSize: '1.75rem' },
  brandText: {
    background:
      'linear-gradient(90deg, #111827, #4F46E5, #7C3AED, #EC4899, #4F46E5, #111827)',
    backgroundSize: '200% auto',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    animation: '$gradientShift 3s ease infinite',
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% center' },
    '50%': { backgroundPosition: '100% center' },
    '100%': { backgroundPosition: '0% center' },
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    '@media (max-width: 768px)': { display: 'none' },
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#6B7280',
    transition: 'color 0.2s',
    position: 'relative',
    '&:hover': { color: '#4F46E5' },
  },
  activeLink: {
    color: '#4F46E5',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#4F46E5',
      borderRadius: '2px',
    },
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userDropdownContainer: {
    position: 'relative',
  },
  userDropdownTrigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    backgroundColor: '#F3F4F6',
    borderRadius: '2rem',
    border: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#E5E7EB',
    },
  },
  userDropdownMenu: {
    position: 'absolute',
    top: '120%',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '0.75rem',
    padding: '0.5rem',
    minWidth: '180px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    zIndex: 101,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 0.75rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
    color: '#374151',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
  },
  dropdownItemLogout: {
    color: '#EF4444',
    '&:hover': {
      backgroundColor: '#FEF2F2',
    },
  },
  userBadge: {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '600',
  },
  btn: {
    padding: '0.6rem 1.25rem',
    borderRadius: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    transition: 'all 0.2s',
  },
  btnLogin: {
    backgroundColor: '#111827',
    color: 'white',
    '&:hover': { backgroundColor: '#000000', transform: 'translateY(-1px)' },
  },
  btnLogout: {
    backgroundColor: 'transparent',
    color: '#EF4444',
    border: '1px solid #FECACA',
    '&:hover': { backgroundColor: '#FEF2F2' },
  },
  langBtn: {
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    color: '#374151',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    '&:hover': { backgroundColor: '#F9FAFB' },
  },
  cartBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontWeight: '700',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#E0E7FF',
      transform: 'translateY(-1px)',
    },
  },
  cartBadge: {
    backgroundColor: '#4F46E5',
    color: 'white',
    fontSize: '0.75rem',
    padding: '0.1rem 0.4rem',
    borderRadius: '99px',
  },
  walletBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ECFDF5',
    color: '#059669',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontWeight: '700',
    border: '1px solid #A7F3D0',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': { backgroundColor: '#D1FAE5', transform: 'translateY(-1px)' },
  },
  walletBalance: {
    fontSize: '0.9rem',
    marginRight: '0.25rem',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#374151',
    '@media (max-width: 768px)': { display: 'block' },
  },
  mobileMenu: {
    position: 'absolute',
    top: '73px',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #E5E7EB',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
});

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { toggleLanguage, language, t } = useLanguage();
  const { totalItems, cartItems, removeFromCart } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user?.token) return;
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBalance(data.balance || 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalance();

    const interval = setInterval(() => {
      fetchBalance();
    }, 3000);

    const onFocus = () => {
      fetchBalance();
    };

    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [user, BASE_URL, location.pathname]);

  const handleTopUpSuccess = () => {
    const refreshBalance = async () => {
      if (!user?.token) return;
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBalance(data.balance || 0);
      } catch (error) {
        console.error(error);
      }
    };

    refreshBalance();
    setTimeout(() => refreshBalance(), 2000);
    setTimeout(() => refreshBalance(), 5000);
    setTimeout(() => refreshBalance(), 10000);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogoutConfirm = () => {
    logoutUser();
    setIsLogoutModalOpen(false);
    setIsUserDropdownOpen(false);

    toast.success(
      (t) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span style={{ flex: 1 }}>Logout Berhasil! Sampai jumpa lagi.</span>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ),
      {
        duration: 5000,
        style: {
          background: '#D1FAE5',
          color: '#065F46',
          fontWeight: '600',
          border: '1px solid #6EE7B7',
          borderRadius: '0.75rem',
          padding: '1rem 1.5rem',
        },
        iconTheme: {
          primary: '#10B981',
          secondary: '#D1FAE5',
        },
      },
    );

    setTimeout(() => {
      navigate('/login');
    }, 5000);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.catalog, path: '/list-products' },
    { label: t.nav.add, path: '/add-products' },
  ];

  return (
    <>
      <Toaster position="top-center" />
      <nav className={classes.navbar}>
        <Link to="/" className={classes.brand}>
          <span className={classes.brandIcon}>🛒</span>
          <span className={classes.brandText}>Ravano Shop</span>
        </Link>

        <div className={classes.navLinks}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${classes.navLink} ${isActive(item.path) ? classes.activeLink : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <button
              className={classes.walletBtn}
              onClick={() => setIsTopUpOpen(true)}
              title="Top Up Saldo"
            >
              <Wallet size={18} />
              <span className={classes.walletBalance}>
                Rp {balance.toLocaleString('id-ID')}
              </span>
              <Plus size={14} strokeWidth={3} />
            </button>
          )}

          <button
            className={classes.cartBtn}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={18} />
            <span>{t.nav.cart}</span>
            {totalItems > 0 && (
              <span className={classes.cartBadge}>{totalItems}</span>
            )}
          </button>

          <button
            onClick={toggleLanguage}
            className={classes.langBtn}
            title={t.nav.language}
          >
            {language === 'id' ? '🇮🇩' : '🇺🇸'}
          </button>

          <div className={classes.authSection}>
            {user ? (
              <div className={classes.userDropdownContainer} ref={dropdownRef}>
                <button
                  className={classes.userDropdownTrigger}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <span className={classes.userBadge}>
                    {t.nav.greeting}, {user.name}
                  </span>
                  <ChevronDown size={16} color="#6B7280" />
                </button>

                {isUserDropdownOpen && (
                  <div className={classes.userDropdownMenu}>
                    <button
                      onClick={handleLogoutClick}
                      className={`${classes.dropdownItem} ${classes.dropdownItemLogout}`}
                    >
                      <LogOut size={16} />
                      {t.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`${classes.btn} ${classes.btnLogin}`}
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>

        <button
          className={classes.mobileMenuBtn}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
      />

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        onSuccess={handleTopUpSuccess}
      />

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

      {isMobileOpen && (
        <div className={classes.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${classes.navLink} ${isActive(item.path) ? classes.activeLink : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <button
              className={classes.walletBtn}
              onClick={() => {
                setIsMobileOpen(false);
                setIsTopUpOpen(true);
              }}
              style={{ justifyContent: 'center', width: '100%' }}
            >
              <Wallet size={18} />
              <span>Rp {balance.toLocaleString('id-ID')}</span>
              <Plus size={14} />
            </button>
          )}

          <button
            className={classes.cartBtn}
            onClick={() => {
              setIsMobileOpen(false);
              setIsCartOpen(true);
            }}
            style={{ justifyContent: 'center', width: '100%' }}
          >
            <ShoppingCart size={18} />
            <span>
              {t.nav.cart} {totalItems > 0 ? `(${totalItems})` : ''}
            </span>
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '0.5rem 0',
            }}
          >
            <button onClick={toggleLanguage} className={classes.langBtn}>
              {t.nav.language} {language === 'id' ? '🇮🇩' : '🇺🇸'}
            </button>
          </div>

          <div
            style={{ height: '1px', background: '#E5E7EB', margin: '0.5rem 0' }}
          />

          {user ? (
            <>
              <div
                className={classes.userBadge}
                style={{ textAlign: 'center', marginBottom: '0.5rem' }}
              >
                {t.nav.greeting}, {user.name}
              </div>
              <button
                onClick={handleLogoutClick}
                className={`${classes.btn} ${classes.btnLogout}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <LogOut size={16} />
                {t.nav.logout}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`${classes.btn} ${classes.btnLogin}`}
              onClick={() => setIsMobileOpen(false)}
              style={{ textAlign: 'center' }}
            >
              {t.nav.login}
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
