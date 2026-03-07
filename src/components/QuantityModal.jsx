import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

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
    maxWidth: '450px',
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
  productInfo: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.75rem',
    border: '1px solid #E5E7EB',
  },
  productImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
  },
  productDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.25rem',
  },
  productPrice: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#4F46E5',
  },
  productStock: {
    fontSize: '0.85rem',
    color: '#6B7280',
    marginTop: '0.25rem',
  },
  quantitySection: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center',
  },
  quantityBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '0.75rem',
    border: '2px solid #E5E7EB',
    backgroundColor: 'white',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover:not(:disabled)': {
      borderColor: '#4F46E5',
      color: '#4F46E5',
      backgroundColor: '#F3F4F6',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  quantityDisplay: {
    width: '100px',
    height: '48px',
    borderRadius: '0.75rem',
    border: '2px solid #E5E7EB',
    backgroundColor: 'white',
    color: '#111827',
    fontSize: '1.4rem',
    fontWeight: '700',
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.12)',
    },
  },
  totalSection: {
    backgroundColor: '#F9FAFB',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  totalLabel: {
    fontSize: '0.95rem',
    color: '#6B7280',
  },
  totalValue: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#374151',
  },
  totalFinal: {
    borderTop: '2px solid #E5E7EB',
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
  },
  totalFinalLabel: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#111827',
  },
  totalFinalValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#4F46E5',
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

const QuantityModal = ({ isOpen, onClose, product, onConfirm }) => {
  const classes = useStyles();
  const [quantityInput, setQuantityInput] = useState('1');

  const formatPrice = (price) => {
    const cleanPrice = parseFloat(String(price).replace(/[^0-9]/g, ''));
    return isNaN(cleanPrice) ? 0 : cleanPrice;
  };

  const price = formatPrice(product?.price);
  const maxStock = parseInt(product?.stock, 10) || 0;
  const parsedQuantity = parseInt(quantityInput, 10);
  const quantity = Number.isNaN(parsedQuantity) ? 0 : parsedQuantity;
  const total = price * quantity;

  useEffect(() => {
    if (isOpen) {
      setQuantityInput('1');
    }
  }, [isOpen, product?.id, product?._id]);

  if (!isOpen || !product) return null;

  const handleIncrease = () => {
    if (quantity < maxStock) {
      setQuantityInput(String(quantity + 1));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantityInput(String(quantity - 1));
    }
  };

  const handleQuantityChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');

    if (rawValue === '') {
      setQuantityInput('');
      return;
    }

    const nextValue = Math.min(parseInt(rawValue, 10), maxStock);
    setQuantityInput(String(nextValue));
  };

  const handleQuantityBlur = () => {
    if (maxStock <= 0) {
      setQuantityInput('0');
      return;
    }

    if (quantityInput === '') {
      setQuantityInput('1');
      return;
    }

    const nextValue = parseInt(quantityInput, 10);
    const normalizedValue = Number.isNaN(nextValue) ? 1 : Math.min(Math.max(nextValue, 1), maxStock);
    setQuantityInput(String(normalizedValue));
  };

  const handleConfirm = () => {
    const finalQuantity = Math.min(Math.max(quantity, 1), maxStock);
    if (finalQuantity < 1 || finalQuantity > maxStock) return;

    onConfirm(finalQuantity);
    setQuantityInput('1');
  };

  const handleClose = () => {
    setQuantityInput('1');
    onClose();
  };

  return (
    <div className={classes.overlay} onClick={handleClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <div className={classes.title}>
            <ShoppingCart size={24} />
            Pilih Jumlah Pembelian
          </div>
          <button className={classes.closeBtn} onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className={classes.body}>
          <div className={classes.productInfo}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={classes.productImage}
              onError={(e) => (e.target.style.display = 'none')}
            />
            <div className={classes.productDetails}>
              <div className={classes.productName}>{product.name}</div>
              <div className={classes.productPrice}>Rp {price.toLocaleString('id-ID')}</div>
              <div className={classes.productStock}>Stok tersedia: {maxStock}</div>
            </div>
          </div>

          <div className={classes.quantitySection}>
            <label className={classes.label}>Jumlah</label>
            <div className={classes.quantityControl}>
              <button
                className={classes.quantityBtn}
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={classes.quantityDisplay}
                value={quantityInput}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                placeholder="1"
                aria-label="Jumlah pembelian"
              />
              <button
                className={classes.quantityBtn}
                onClick={handleIncrease}
                disabled={quantity >= maxStock}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className={classes.totalSection}>
            <div className={classes.totalRow}>
              <span className={classes.totalLabel}>Harga Satuan</span>
              <span className={classes.totalValue}>Rp {price.toLocaleString('id-ID')}</span>
            </div>
            <div className={classes.totalRow}>
              <span className={classes.totalLabel}>Jumlah</span>
              <span className={classes.totalValue}>{quantity}</span>
            </div>
            <div className={`${classes.totalRow} ${classes.totalFinal}`}>
              <span className={classes.totalFinalLabel}>Total Bayar</span>
              <span className={classes.totalFinalValue}>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            className={classes.submitBtn}
            onClick={handleConfirm}
            disabled={quantity < 1 || quantity > maxStock || maxStock <= 0}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityModal;
