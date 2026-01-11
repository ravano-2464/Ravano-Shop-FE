import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { User, Mail, Lock, X, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '1.5rem',
    boxShadow:
      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '0.875rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    fontSize: '0.95rem',
    color: '#1F2937',
    transition: 'all 0.2s',
    outline: 'none',
    '&:focus': {
      borderColor: '#4F46E5',
      backgroundColor: 'white',
      boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
    },
  },
  button: {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      backgroundColor: '#4338CA',
    },
    '&:disabled': {
      backgroundColor: '#9CA3AF',
      cursor: 'not-allowed',
    },
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  link: {
    color: '#4F46E5',
    fontWeight: '600',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/auth/register`, formData);

      toast.success(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>Registrasi berhasil! Silakan login.</span>
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

      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Gagal mendaftar';
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>{errorMsg}</span>
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
            background: '#FEE2E2',
            color: '#991B1B',
            fontWeight: '600',
            border: '1px solid #FCA5A5',
            borderRadius: '0.75rem',
            padding: '1rem 1.5rem',
          },
          iconTheme: {
            primary: '#DC2626',
            secondary: '#FEE2E2',
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Toaster position="top-center" />
      <div className={classes.card}>
        <div className={classes.header}>
          <h1 className={classes.title}>Buat Akun</h1>
          <p className={classes.subtitle}>Mulai perjalanan belanja Anda</p>
        </div>

        <form onSubmit={handleRegister} className={classes.form}>
          <div className={classes.inputGroup}>
            <User size={20} className={classes.icon} />
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              className={classes.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <Mail size={20} className={classes.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={classes.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.inputGroup}>
            <Lock size={20} className={classes.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={classes.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={classes.button} disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Memproses...
              </>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>

        <div className={classes.footer}>
          Sudah punya akun?{' '}
          <Link to="/login" className={classes.link}>
            Login disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
