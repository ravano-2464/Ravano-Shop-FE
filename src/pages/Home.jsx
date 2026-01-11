import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import useAuth from '../hooks/Auth/useAuth';
import { useLanguage } from '../context/LanguageContext';

const useStyles = createUseStyles({
  wrapper: {
    minHeight: 'calc(100vh - 73px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    width: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      textAlign: 'left',
      justifyContent: 'space-between',
    },
  },
  textSection: {
    flex: 1,
    maxWidth: '600px',
    position: 'relative',
    zIndex: 2,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: '1.5rem',
    border: '1px solid #E5E7EB',
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
    color: '#4F46E5',
    position: 'relative',
    zIndex: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '5px',
      left: 0,
      width: '100%',
      height: '10px',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
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
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#000000',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
  },
  secondaryBtn: {
    backgroundColor: 'white',
    color: '#111827',
    border: '1px solid #E5E7EB',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#111827',
      backgroundColor: '#F9FAFB',
    },
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3rem',
    position: 'relative',
    zIndex: 1,
    '@media (min-width: 1024px)': {
      marginTop: 0,
      justifyContent: 'flex-end',
    },
  },
  imageContainer: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    position: 'relative',
    zIndex: 1,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '100%',
      height: '100%',
      backgroundColor: '#E0E7FF',
      borderRadius: '2rem',
      zIndex: -1,
    },
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '2rem',
    objectFit: 'cover',
    position: 'relative',
    zIndex: 2,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  statsBox: {
    position: 'absolute',
    bottom: '20px',
    left: '-20px',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid #F3F4F6',
    zIndex: 3,
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontWeight: '500',
  },
});

const Home = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.textSection}>
          <div className={classes.badge}>
            <span>{t.home.badge}</span>
          </div>
          <h1 className={classes.title}>
            {t.home.titleLine1} <br />
            <span className={classes.highlight}>{t.home.titleHighlight}</span>
          </h1>
          <p className={classes.description}>
            {t.home.welcome} <strong>{user?.name}</strong>. {t.home.description}
          </p>
          <div className={classes.buttonGroup}>
            <Link to="/list-products" className={classes.primaryBtn}>
              {t.home.exploreBtn}
            </Link>
            <Link to="/add-products" className={classes.secondaryBtn}>
              {t.home.addBtn}
            </Link>
          </div>
        </div>

        <div className={classes.imageSection}>
          <div className={classes.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Fashion Collection"
              className={classes.heroImage}
            />
            <div className={classes.statsBox}>
              <span className={classes.statValue}>2.5k+</span>
              <span className={classes.statLabel}>{t.home.statsActive}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
