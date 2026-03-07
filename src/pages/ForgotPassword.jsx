import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ArrowLeft, CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'radial-gradient(circle at top left, rgba(132, 204, 22, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.2), transparent 45%), linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
    padding: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    borderRadius: '1.25rem',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    boxShadow: '0 18px 30px -16px rgba(15, 23, 42, 0.45)',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    marginTop: '0.6rem',
    marginBottom: '1.6rem',
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: 1.55,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    color: '#334155',
    fontWeight: 700,
  },
  inputWrap: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: '0.9rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    borderRadius: '0.8rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontSize: '0.95rem',
    padding: '0.78rem 0.95rem 0.78rem 2.7rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.16)',
      backgroundColor: '#ffffff',
    },
  },
  button: {
    marginTop: '0.4rem',
    border: 'none',
    borderRadius: '0.85rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 700,
    padding: '0.84rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 10px 20px -12px rgba(37, 99, 235, 0.75)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 14px 24px -14px rgba(37, 99, 235, 0.8)',
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  message: {
    marginTop: '1rem',
    borderRadius: '0.75rem',
    padding: '0.78rem 0.9rem',
    fontSize: '0.9rem',
    lineHeight: 1.45,
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-start',
  },
  successMessage: {
    color: '#166534',
    backgroundColor: '#ecfdf5',
    border: '1px solid #86efac',
  },
  errorMessage: {
    color: '#991b1b',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
  },
  devBox: {
    marginTop: '0.8rem',
    borderRadius: '0.75rem',
    border: '1px dashed #60a5fa',
    backgroundColor: '#eff6ff',
    padding: '0.8rem',
    color: '#1e40af',
    fontSize: '0.84rem',
    wordBreak: 'break-all',
  },
  devHeader: {
    margin: 0,
    marginBottom: '0.45rem',
    fontWeight: 700,
  },
  copyButton: {
    marginTop: '0.6rem',
    border: '1px solid #93c5fd',
    borderRadius: '0.65rem',
    padding: '0.4rem 0.7rem',
    fontSize: '0.8rem',
    color: '#1e3a8a',
    backgroundColor: '#dbeafe',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  footerRow: {
    marginTop: '1.2rem',
  },
  backLink: {
    color: '#1d4ed8',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const ForgotPassword = () => {
  const classes = useStyles();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setResetLink('');
    setIsCopied(false);
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email,
      });
      setMessage(
        response.data?.message ||
          'Jika email terdaftar, link reset password sudah dibuat. Silakan cek email Anda.'
      );
      if (response.data?.resetLink) {
        setResetLink(response.data.resetLink);
      }
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Gagal memproses permintaan reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!resetLink) return;

    try {
      await navigator.clipboard.writeText(resetLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1200);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.title}>{t.auth.forgotPasswordTitle}</h1>
        <p className={classes.subtitle}>{t.auth.forgotPasswordSubtitle}</p>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label className={classes.label}>{t.auth.emailLabel}</label>
            <div className={classes.inputWrap}>
              <Mail size={18} className={classes.icon} />
              <input
                type="email"
                className={classes.input}
                placeholder={t.auth.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={classes.button} disabled={isSubmitting}>
            <Send size={18} />
            {isSubmitting ? t.auth.sendingResetBtn : t.auth.forgotPasswordBtn}
          </button>
        </form>

        {message ? (
          <div className={`${classes.message} ${classes.successMessage}`}>
            <CheckCircle2 size={18} />
            <span>{message}</span>
          </div>
        ) : null}

        {error ? <div className={`${classes.message} ${classes.errorMessage}`}>{error}</div> : null}

        {resetLink ? (
          <div className={classes.devBox}>
            <p className={classes.devHeader}>Reset link (development mode):</p>
            <span>{resetLink}</span>
            <div>
              <button type="button" className={classes.copyButton} onClick={handleCopy}>
                <Copy size={14} />
                {isCopied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
        ) : null}

        <div className={classes.footerRow}>
          <Link to="/login" className={classes.backLink}>
            <ArrowLeft size={16} />
            {t.auth.backToLogin}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
