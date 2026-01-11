import React, { useState, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { X, Wallet, CreditCard } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    animation: '$fadeIn 0.3s forwards',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    maxWidth: '400px',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    transform: 'scale(0.95)',
    animation: '$scaleIn 0.3s 0.1s forwards',
  },
  '@keyframes fadeIn': { to: { opacity: 1 } },
  '@keyframes scaleIn': { to: { transform: 'scale(1)' } },
  header: {
    backgroundColor: '#4F46E5',
    padding: '1.5rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    '&:hover': { background: 'rgba(255, 255, 255, 0.3)' },
  },
  body: { padding: '2rem' },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  inputGroup: { position: 'relative', marginBottom: '1.5rem' },
  currencySymbol: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6B7280',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '0.75rem',
    border: '2px solid #E5E7EB',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#111827',
    outline: 'none',
    transition: 'border-color 0.2s',
    '&:focus': { borderColor: '#4F46E5' },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  amountBtn: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    color: '#374151',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': { borderColor: '#4F46E5', color: '#4F46E5' },
  },
  submitBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background 0.2s',
    '&:hover': { backgroundColor: '#4338CA' },
    '&:disabled': { backgroundColor: '#9CA3AF', cursor: 'not-allowed' },
  },
  devNote: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#FEF3C7',
    border: '1px solid #FCD34D',
    borderRadius: '0.5rem',
    fontSize: '0.85rem',
    color: '#92400E',
    lineHeight: '1.4',
  },
});

const TopUpModal = ({ isOpen, onClose, onSuccess }) => {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IS_PRODUCTION = import.meta.env.VITE_NODE_ENV === 'production';

  useEffect(() => {
    const snapUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    if (!isOpen) return;

    const existingScript = document.querySelector(`script[src="${snapUrl}"]`);
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = snapUrl;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(`script[src="${snapUrl}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [isOpen]);

  const handleQuickAmount = useCallback((val) => {
    setAmount(val.toLocaleString('id-ID'));
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue === '') {
      setAmount('');
      return;
    }

    const formattedValue = parseInt(cleanValue).toLocaleString('id-ID');
    setAmount(formattedValue);
  };

  const handleManualTopUp = async () => {
    const cleanAmount = amount.replace(/\D/g, '');

    if (!cleanAmount || parseInt(cleanAmount) < 10000) {
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>Minimal top up adalah Rp 10.000</span>
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
          duration: 5000,
        },
      );
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>Sesi habis, silakan login ulang.</span>
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
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        `${BASE_URL}/manual-topup`,
        { amount: parseInt(cleanAmount) },
        config,
      );

      toast.success(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>
              {`Saldo berhasil ditambahkan: Rp ${parseInt(cleanAmount).toLocaleString('id-ID')}`}
            </span>
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
          duration: 5000,
        },
      );
      setAmount('');
      setLoading(false);

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Gagal menambahkan saldo';
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
          duration: 5000,
        },
      );
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    const cleanAmount = amount.replace(/\D/g, '');

    if (!cleanAmount || parseInt(cleanAmount) < 10000) {
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>Minimal top up adalah Rp 10.000</span>
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
          duration: 5000,
        },
      );
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flex: 1 }}>Sesi habis, silakan login ulang.</span>
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
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/topup`,
        { amount: parseInt(cleanAmount) },
        config,
      );

      if (data && data.redirect_url) {
        toast.success(
          (t) => (
            <div
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <span style={{ flex: 1 }}>
                Mengalihkan ke halaman pembayaran...
              </span>
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
            style: {
              background: '#DBEAFE',
              color: '#1E40AF',
              fontWeight: '600',
              border: '1px solid #93C5FD',
              borderRadius: '0.75rem',
              padding: '1rem 1.5rem',
            },
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#DBEAFE',
            },
            duration: 5000,
          },
        );
        window.open(data.redirect_url, '_blank');

        setTimeout(() => {
          setLoading(false);
          if (onClose) onClose();
        }, 1000);
      } else {
        throw new Error('Token pembayaran tidak valid');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.message ||
        'Gagal memproses transaksi';
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
          duration: 5000,
        },
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      {isOpen && (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <div className={classes.header}>
              <div className={classes.title}>
                <Wallet size={24} />
                Top Up Saldo
              </div>
              <button className={classes.closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className={classes.body}>
              <div className={classes.label}>Pilih Nominal</div>
              <div className={classes.grid}>
                {[20000, 50000, 100000].map((val) => (
                  <button
                    key={val}
                    className={classes.amountBtn}
                    onClick={() => handleQuickAmount(val)}
                    disabled={loading}
                  >
                    {val / 1000}k
                  </button>
                ))}
              </div>

              <div className={classes.label}>Atau Input Manual</div>
              <div className={classes.inputGroup}>
                <span className={classes.currencySymbol}>Rp</span>
                <input
                  type="text"
                  className={classes.input}
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  disabled={loading}
                />
              </div>

              <button
                className={classes.submitBtn}
                onClick={handleTopUp}
                disabled={loading}
                style={{ marginBottom: '0.75rem' }}
              >
                {loading ? 'Memproses...' : 'Bayar via Midtrans'}
                <CreditCard size={20} />
              </button>

              {!IS_PRODUCTION && (
                <>
                  <button
                    className={classes.submitBtn}
                    onClick={handleManualTopUp}
                    disabled={loading}
                    style={{ backgroundColor: '#059669' }}
                  >
                    {loading ? 'Memproses...' : 'Top Up Manual (Dev)'}
                    <Wallet size={20} />
                  </button>

                  <div className={classes.devNote}>
                    <strong>Mode Development:</strong> Jika Midtrans error,
                    gunakan "Top Up Manual" untuk testing. Fitur ini akan
                    dihapus di production.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopUpModal;
