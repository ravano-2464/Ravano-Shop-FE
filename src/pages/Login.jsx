import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import useAuth from '../hooks/Auth/useAuth';
import { useLanguage } from '../context/LanguageContext';

const useStyles = createUseStyles({
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s',
    '&:focus': {
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    },
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.875rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#4338ca',
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  notification: {
    position: 'fixed',
    top: '1.5rem',
    right: '1.5rem',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    animation: '$slideIn 0.3s ease-out forwards',
    maxWidth: '90vw',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '0.5rem',
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const success = await loginUser(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
      }
    } catch {
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.container}>
      {error && (
        <div className={classes.notification}>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className={classes.closeButton}
          >
            ✕
          </button>
        </div>
      )}

      <div className={classes.card}>
        <h2 className={classes.title}>{t.auth.loginTitle}</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.inputGroup}>
            <label className={classes.label}>{t.auth.emailLabel}</label>
            <input
              type="email"
              name="email"
              required
              className={classes.input}
              value={formData.email}
              onChange={handleChange}
              placeholder={t.auth.emailPlaceholder}
            />
          </div>
          <div className={classes.inputGroup}>
            <label className={classes.label}>{t.auth.passwordLabel}</label>
            <input
              type="password"
              name="password"
              required
              className={classes.input}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className={classes.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? t.auth.signingInBtn : t.auth.signInBtn}
          </button>
        </form>
        <div className={classes.footer}>
          {t.auth.noAccount}{' '}
          <Link to="/register" className={classes.link}>
            {t.auth.linkRegister}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
