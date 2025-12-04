import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 2,
    maxWidth: '1200px',
    width: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    textAlign: 'center',
    gap: '3rem',
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      textAlign: 'left',
      justifyContent: 'space-between',
      gap: '0',
    },
  },
  textSection: {
    flex: 1,
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (min-width: 1024px)': {
      alignItems: 'flex-start',
    },
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: '1.5rem',
    border: '1px solid #FECACA',
  },
  title: {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: '900',
    lineHeight: '1',
    letterSpacing: '-0.02em',
    color: '#111827',
    marginBottom: '1.5rem',
  },
  highlight: {
    color: '#DC2626',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '5px',
      left: 0,
      width: '100%',
      height: '10px',
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      zIndex: -1,
    },
  },
  description: {
    fontSize: '1.25rem',
    color: '#4B5563',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
    maxWidth: '500px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
  },
  primaryBtn: {
    backgroundColor: '#111827',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#000000',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-end',
    },
  },
  imageContainer: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-20px',
      right: '20px',
      width: '100%',
      height: '100%',
      backgroundColor: '#FFE4E6',
      borderRadius: '2rem',
      zIndex: -1,
      '@media (min-width: 1024px)': {
        right: '-20px',
      },
    },
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '2rem',
    objectFit: 'cover',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    filter: 'grayscale(20%)',
  },
  statsBox: {
    position: 'absolute',
    bottom: '20px',
    left: '-10px',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid #F3F4F6',
    zIndex: 10,
    '@media (min-width: 1024px)': {
      left: '-20px',
    },
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#DC2626',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontWeight: '500',
  },
});

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.textSection}>
          <div className={classes.badge}>
            <span>404 Error</span>
          </div>
          <h1 className={classes.title}>
            Halaman <br />
            <span className={classes.highlight}>Tidak Ditemukan</span>
          </h1>
          <p className={classes.description}>
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin telah
            dipindahkan atau dihapus.
          </p>
          <div className={classes.buttonGroup}>
            <button
              onClick={() => navigate('/')}
              className={classes.primaryBtn}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>

        <div className={classes.imageSection}>
          <div className={classes.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="404 Not Found"
              className={classes.heroImage}
            />
            <div className={classes.statsBox}>
              <span className={classes.statValue}>404</span>
              <span className={classes.statLabel}>Status Code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
