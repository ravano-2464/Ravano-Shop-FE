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
});

const TopUpModal = ({ isOpen, onClose, onSuccess }) => {
  const classes = useStyles();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://ravano-shops-e7559390ffbd.herokuapp.com/api';
  const CLIENT_KEY =
    import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'Mid-client-3QjoQrQZ8eECoAx0';

  useEffect(() => {
    const snapUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const scriptId = 'midtrans-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.src = snapUrl;
      script.id = scriptId;
      script.setAttribute('data-client-key', CLIENT_KEY);
      script.async = true;
      document.body.appendChild(script);
    }
  }, [CLIENT_KEY]);

  const handleQuickAmount = useCallback((val) => {
    setAmount(val.toString());
  }, []);

  const handlePayment = useCallback(
    (token) => {
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: () => {
            toast.success('Pembayaran berhasil!');
            setAmount('');
            setLoading(false);
            if (onSuccess) onSuccess();
            if (onClose) onClose();
          },
          onPending: () => {
            toast('Menunggu pembayaran...');
            setLoading(false);
            if (onClose) onClose();
          },
          onError: (result) => {
            console.error('Payment Error:', result);
            toast.error(
              'Gagal verifikasi otomatis. Cek dashboard jika saldo sudah terpotong.',
            );
            setLoading(false);
          },
          onClose: () => {
            setLoading(false);
            toast('Silakan selesaikan pembayaran.');
          },
        });
      } else {
        toast.error('Koneksi ke Midtrans gagal. Refresh halaman.');
        setLoading(false);
      }
    },
    [onSuccess, onClose],
  );

  const handleTopUp = async () => {
    if (!amount || parseInt(amount) < 10000) {
      toast.error('Minimal top up Rp 10.000');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user && !localStorage.getItem('user')) {
      toast.error('Sesi habis, silakan login ulang.');
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token || ''}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/topup`,
        { amount: parseInt(amount) },
        config,
      );

      if (data && data.token) {
        handlePayment(data.token);
      } else {
        throw new Error('Token pembayaran tidak valid');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || 'Gagal memproses transaksi';
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster position="top-center" />
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
                >
                  {val / 1000}k
                </button>
              ))}
            </div>

            <div className={classes.label}>Atau Input Manual</div>
            <div className={classes.inputGroup}>
              <span className={classes.currencySymbol}>Rp</span>
              <input
                type="number"
                className={classes.input}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="10000"
              />
            </div>

            <button
              className={classes.submitBtn}
              onClick={handleTopUp}
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Bayar Sekarang'}
              <CreditCard size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpModal;
