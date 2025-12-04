import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { ShoppingCart } from 'lucide-react';
import useAuth from '../hooks/Auth/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../hooks/Cart/useCart';
import CartModal from './CartModal';

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
  brandIcon: {
    fontSize: '1.75rem',
  },
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
  userBadge: {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    backgroundColor: '#F3F4F6',
    borderRadius: '2rem',
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
  const { toggleLanguage, language } = useLanguage();
  const { totalItems, cartItems, removeFromCart } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/list-products' },
    { label: 'Add Product', path: '/add-products' },
  ];

  return (
    <>
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

          <button
            className={classes.cartBtn}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className={classes.cartBadge}>{totalItems}</span>
            )}
          </button>

          <button
            onClick={toggleLanguage}
            className={classes.langBtn}
            title="Change Language"
          >
            {language === 'id' ? '🇮🇩' : '🇺🇸'}
          </button>

          <div className={classes.authSection}>
            {user ? (
              <>
                <span className={classes.userBadge}>Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className={`${classes.btn} ${classes.btnLogout}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`${classes.btn} ${classes.btnLogin}`}
              >
                Sign In
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

          <button
            className={classes.cartBtn}
            onClick={() => {
              setIsMobileOpen(false);
              setIsCartOpen(true);
            }}
            style={{ justifyContent: 'center', width: '100%' }}
          >
            <ShoppingCart size={18} />
            <span>Cart {totalItems > 0 ? `(${totalItems})` : ''}</span>
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '0.5rem 0',
            }}
          >
            <button onClick={toggleLanguage} className={classes.langBtn}>
              Change Language {language === 'id' ? '🇮🇩' : '🇺🇸'}
            </button>
          </div>

          <div
            style={{ height: '1px', background: '#E5E7EB', margin: '0.5rem 0' }}
          />

          {user ? (
            <>
              <div
                className={classes.userBadge}
                style={{ textAlign: 'center' }}
              >
                Hi, {user.name}
              </div>
              <button
                onClick={handleLogout}
                className={`${classes.btn} ${classes.btnLogout}`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`${classes.btn} ${classes.btnLogin}`}
              onClick={() => setIsMobileOpen(false)}
              style={{ textAlign: 'center' }}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
