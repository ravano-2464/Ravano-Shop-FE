import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import useProducts from '../hooks/Products/useProducts';
import toast from 'react-hot-toast';

const useStyles = createUseStyles({
  page: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    padding: '3rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  visibilityBadge: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontWeight: '700',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  public: { backgroundColor: '#10B981' },
  private: { backgroundColor: '#6B7280' },
  image: {
    maxWidth: '90%',
    maxHeight: '400px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))',
  },
  contentSide: {
    flex: 1,
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6B7280',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginBottom: '2rem',
    '&:hover': { color: '#111827' },
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#111827',
    marginBottom: '0.5rem',
    lineHeight: 1.1,
  },
  metaInfo: {
    fontSize: '0.9rem',
    color: '#6B7280',
    marginBottom: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  price: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#4F46E5',
  },
  stock: {
    fontSize: '1.25rem',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
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
    fontSize: '1rem',
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1rem',
    marginTop: '3rem',
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
    '&:hover': {
      backgroundColor: '#F9FAFB',
      borderColor: '#D1D5DB',
    },
  },
});

const ProductDetail = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { productDetail, loading, buyProduct, refetch, t } = useProducts(id);

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

  const handleOrder = async () => {
    if (productDetail.stock > 0) {
      const toastId = toast.loading('Processing...');
      try {
        await buyProduct(id);
        if (refetch) await refetch();
        toast.success('Success!', { id: toastId });
      } catch  {
        toast.error('Failed', { id: toastId });
      }
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
            {productDetail.visibility === 'public' ? '🌍 Public' : '🔒 Private'}
          </div>
          <img
            src={productDetail.imageUrl}
            alt={productDetail.name}
            className={classes.image}
            onError={(e) => (e.target.style.display = 'none')}
          />
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
              onClick={handleOrder}
              disabled={productDetail.stock <= 0}
              className={`${classes.orderBtn} ${
                productDetail.stock > 0
                  ? classes.btnEnabled
                  : classes.btnDisabled
              }`}
            >
              {productDetail.stock > 0 ? t.detail.buyBtn : t.list.outOfStock}
            </button>
            <Link to={`/edit/products/${id}`} className={classes.secondaryBtn}>
              {t.detail.editBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
