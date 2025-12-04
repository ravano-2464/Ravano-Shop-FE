import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Navbar from './Navbar';
import Footer from './Footer';
import { LanguageProvider } from '../context/LanguageContext';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
  },
  main: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #E5E7EB',
    borderTopColor: '#4F46E5',
    borderRadius: '50%',
    animation: '$spin 0.8s linear infinite',
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
});

const LayoutContent = () => {
  const classes = useStyles();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setLoading(true), 0);
    const endTimer = setTimeout(() => setLoading(false), 800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [location.pathname]);

  return (
    <div className={classes.wrapper}>
      {loading && (
        <div className={classes.loader}>
          <div className={classes.spinner} />
        </div>
      )}

      <Navbar />

      <main className={classes.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

const Layout = () => {
  return (
    <LanguageProvider>
      <LayoutContent />
    </LanguageProvider>
  );
};

export default Layout;
