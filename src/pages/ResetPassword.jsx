import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ArrowLeft, CircleAlert, KeyRound, LoaderCircle, Lock, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    background:
      'radial-gradient(circle at top, rgba(14, 165, 233, 0.18), transparent 38%), linear-gradient(165deg, #f8fafc 0%, #e2e8f0 100%)',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    borderRadius: '1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(30, 41, 59, 0.08)',
    boxShadow: '0 20px 35px -16px rgba(15, 23, 42, 0.45)',
    padding: '2rem',
  },
  badge: {
    width: '42px',
    height: '42px',
    borderRadius: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0f766e',
    backgroundColor: '#ccfbf1',
    border: '1px solid #99f6e4',
    marginBottom: '0.9rem',
  },
  title: {
    margin: 0,
    fontSize: '1.7rem',
    color: '#0f172a',
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  subtitle: {
    marginTop: '0.55rem',
    marginBottom: '1.3rem',
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: 1.55,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.95rem',
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '0.9rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
  },
  input: {
    width: '100%',
    borderRadius: '0.8rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontSize: '0.94rem',
    padding: '0.76rem 0.95rem 0.76rem 2.7rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#0ea5e9',
      boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.14)',
      backgroundColor: 'white',
    },
  },
  label: {
    marginBottom: '0.45rem',
    display: 'block',
    color: '#334155',
    fontWeight: 700,
    fontSize: '0.89rem',
  },
  helper: {
    margin: '0.2rem 0 0.4rem',
    color: '#64748b',
    fontSize: '0.82rem',
  },
  button: {
    marginTop: '0.5rem',
    border: 'none',
    borderRadius: '0.85rem',
    padding: '0.84rem',
    background: 'linear-gradient(140deg, #0891b2 0%, #0e7490 100%)',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.72,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  infoBox: {
    marginTop: '0.8rem',
    borderRadius: '0.75rem',
    padding: '0.75rem 0.9rem',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  error: {
    color: '#991b1b',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
  },
  success: {
    color: '#065f46',
    backgroundColor: '#ecfdf5',
    border: '1px solid #86efac',
  },
  backRow: {
    marginTop: '1.15rem',
  },
  link: {
    color: '#0e7490',
    fontWeight: 700,
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  loaderWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#334155',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  spin: {
    animation: '$spin 1s linear infinite',
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
});

const ResetPassword = () => {
  const classes = useStyles();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetToken = useMemo(
    () => new URLSearchParams(location.search).get('token') || '',
    [location.search]
  );

  useEffect(() => {
    const validateToken = async () => {
      if (!resetToken) {
        setError('Token reset tidak ditemukan.');
        setIsTokenValid(false);
        setIsValidating(false);
        return;
      }

      try {
        await axios.get(`${BASE_URL}/auth/reset-password/validate`, {
          params: { token: resetToken },
        });
        setIsTokenValid(true);
        setError('');
      } catch (requestError) {
        setIsTokenValid(false);
        setError(
          requestError.response?.data?.error || 'Token reset tidak valid atau sudah kedaluwarsa.'
        );
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [resetToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sama.');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, {
        token: resetToken,
        password,
      });
      setSuccess('Password berhasil diubah. Anda akan diarahkan ke halaman login.');
      setTimeout(() => {
        navigate('/login');
      }, 1400);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Gagal mengubah password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.badge}>
          <KeyRound size={20} />
        </div>
        <h1 className={classes.title}>{t.auth.resetPasswordTitle}</h1>
        <p className={classes.subtitle}>{t.auth.resetPasswordSubtitle}</p>

        {isValidating ? (
          <div className={classes.loaderWrap}>
            <LoaderCircle size={18} className={classes.spin} />
            <span>Memverifikasi token...</span>
          </div>
        ) : null}

        {!isValidating && isTokenValid ? (
          <form onSubmit={handleSubmit} className={classes.form}>
            <div>
              <label className={classes.label}>{t.auth.passwordLabel}</label>
              <div className={classes.inputWrap}>
                <Lock size={18} className={classes.inputIcon} />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={classes.input}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className={classes.label}>{t.auth.confirmPasswordLabel}</label>
              <div className={classes.inputWrap}>
                <ShieldCheck size={18} className={classes.inputIcon} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={classes.input}
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className={classes.helper}>Minimal 8 karakter dan gunakan kombinasi yang kuat.</p>
            </div>

            <button type="submit" className={classes.button} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className={classes.spin} />
                  {t.auth.resettingPasswordBtn}
                </>
              ) : (
                t.auth.resetPasswordBtn
              )}
            </button>
          </form>
        ) : null}

        {error ? (
          <div className={`${classes.infoBox} ${classes.error}`}>
            <CircleAlert size={17} />
            <span>{error}</span>
          </div>
        ) : null}

        {success ? <div className={`${classes.infoBox} ${classes.success}`}>{success}</div> : null}

        <div className={classes.backRow}>
          <Link to="/login" className={classes.link}>
            <ArrowLeft size={16} />
            {t.auth.backToLogin}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
