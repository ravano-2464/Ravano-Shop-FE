import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import useProducts from '../hooks/Products/useProducts';
import toast from 'react-hot-toast';
import axios from 'axios';
import QuantityModal from '../components/QuantityModal';
import ReceiptModal from '../components/ReceiptModal';

const useStyles = createUseStyles({
  page: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    padding: '1.5rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '@media (min-width: 900px)': {
      alignItems: 'center',
      padding: '3rem 1rem',
    },
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '1100px',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 900px)': {
      flexDirection: 'row',
      minHeight: '600px',
    },
  },
  visualSide: {
    flex: 1.2,
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    minHeight: '300px',
  },
  visibilityBadge: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontWeight: '700',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontSize: '0.875rem',
  },
  public: { backgroundColor: '#10B981' },
  private: { backgroundColor: '#6B7280' },
  imageWrapper: {
    maxWidth: '100%',
    maxHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))',
  },
  noImagePlaceholder: {
    color: '#D1D5DB',
    fontSize: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
    padding: '2rem',
  },
  contentSide: {
    flex: 1,
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      padding: '3rem',
    },
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6B7280',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    '&:hover': { color: '#111827' },
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '900',
    color: '#111827',
    marginBottom: '0.5rem',
    lineHeight: 1.2,
    '@media (min-width: 768px)': {
      fontSize: '2.5rem',
      lineHeight: 1.1,
    },
  },
  metaInfo: {
    fontSize: '0.85rem',
    color: '#6B7280',
    marginBottom: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
      fontSize: '0.9rem',
    },
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  price: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#4F46E5',
    '@media (min-width: 768px)': {
      fontSize: '2rem',
    },
  },
  stock: {
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    display: 'inline-block',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
  inStock: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  outOfStock: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  descriptionBox: {
    backgroundColor: '#F9FAFB',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #E5E7EB',
    marginBottom: 'auto',
  },
  descLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: '0.75rem',
    display: 'block',
  },
  descText: {
    color: '#374151',
    lineHeight: 1.7,
    fontSize: '0.95rem',
    '@media (min-width: 768px)': {
      fontSize: '1rem',
    },
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    marginTop: '2rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '2fr 1fr',
      marginTop: '3rem',
    },
  },
  orderBtn: {
    padding: '1rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s',
  },
  btnEnabled: {
    backgroundColor: '#4F46E5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4338CA',
      transform: 'translateY(-2px)',
    },
  },
  btnDisabled: {
    backgroundColor: '#D1D5DB',
    color: '#6B7280',
    cursor: 'not-allowed',
  },
  secondaryBtn: {
    padding: '1rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    textAlign: 'center',
    textDecoration: 'none',
    border: '1px solid #E5E7EB',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#F9FAFB',
      borderColor: '#D1D5DB',
    },
  },
});

const ProductDetail = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { productDetail, loading, refetch, t } = useProducts(id);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }, []);

  const isOwner = useMemo(() => {
    if (!currentUser || !productDetail) return false;
    return (
      productDetail.user?._id === currentUser._id ||
      productDetail.user?.id === currentUser._id ||
      productDetail.user === currentUser._id
    );
  }, [currentUser, productDetail]);

  const formatPrice = (value) => {
    if (!value) return '0';
    const clean = String(value).replace(/[^0-9]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? '0' : num.toLocaleString('id-ID');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleOrderClick = () => {
    if (productDetail.stock <= 0) {
      toast.error('Stok habis!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    setQuantityModalOpen(true);
  };

  const handleOrder = async (quantity) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    const toastId = toast.loading('Memproses transaksi...');

    try {
      const cleanPrice = parseFloat(
        String(productDetail.price).replace(/[^0-9]/g, ''),
      );
      const payload = {
        items: [
          {
            id: productDetail.id || productDetail._id,
            quantity: quantity,
            name: productDetail.name,
            price: cleanPrice,
          },
        ],
      };

      const response = await axios.post(`${BASE_URL}/checkout`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setReceiptData(response.data);
      setShowReceipt(true);
      setQuantityModalOpen(false);
      toast.success('Pembelian Berhasil!', { id: toastId });
      if (refetch) await refetch();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transaksi gagal', {
        id: toastId,
      });
    }
  };

  if (loading || !productDetail)
    return <div className="p-10 text-center">{t.detail.loading}</div>;

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.visualSide}>
          <div
            className={`${classes.visibilityBadge} ${
              productDetail.visibility === 'public'
                ? classes.public
                : classes.private
            }`}
          >
            {productDetail.visibility === 'public' ? '🌐 Public' : '🔒 Private'}
          </div>
          <div className={classes.imageWrapper}>
            {!imageError ? (
              <img
                src={productDetail.imageUrl}
                alt={productDetail.name}
                className={classes.image}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={classes.noImagePlaceholder}>No Image</div>
            )}
          </div>
        </div>
        <div className={classes.contentSide}>
          <Link to="/list-products" className={classes.backLink}>
            ← {t.detail.back}
          </Link>
          <h1 className={classes.title}>{productDetail.name}</h1>

          <div className={classes.metaInfo}>
            <span>Created by: {productDetail.user?.name || 'Unknown'}</span>
            <span>Created: {formatDate(productDetail.created_at)}</span>
            <span>Last Updated: {formatDate(productDetail.updated_at)}</span>
          </div>

          <div className={classes.priceRow}>
            <span className={classes.price}>
              Rp {formatPrice(productDetail.price)}
            </span>
            <span
              className={`${classes.stock} ${
                productDetail.stock > 0 ? classes.inStock : classes.outOfStock
              }`}
            >
              {productDetail.stock > 0
                ? `${t.detail.stock}: ${productDetail.stock}`
                : t.list.outOfStock}
            </span>
          </div>

          <div className={classes.descriptionBox}>
            <span className={classes.descLabel}>{t.detail.descLabel}</span>
            <p className={classes.descText}>{productDetail.description}</p>
          </div>

          <div className={classes.actions}>
            <button
              onClick={handleOrderClick}
              disabled={productDetail.stock <= 0}
              className={`${classes.orderBtn} ${
                productDetail.stock > 0
                  ? classes.btnEnabled
                  : classes.btnDisabled
              }`}
            >
              {productDetail.stock > 0 ? t.detail.buyBtn : t.list.outOfStock}
            </button>
            {isOwner && (
              <Link
                to={`/edit/products/${id}`}
                className={classes.secondaryBtn}
              >
                {t.detail.editBtn}
              </Link>
            )}
          </div>
        </div>
      </div>

      <QuantityModal
        isOpen={quantityModalOpen}
        onClose={() => setQuantityModalOpen(false)}
        product={productDetail}
        onConfirm={handleOrder}
      />

      {showReceipt && receiptData && (
        <ReceiptModal
          transaction={receiptData}
          onClose={() => {
            setShowReceipt(false);
            setReceiptData(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductDetail;
