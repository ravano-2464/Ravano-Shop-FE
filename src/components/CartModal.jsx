import React from 'react';
import { createUseStyles } from 'react-jss';
import { X, Trash2, ShoppingBag } from 'lucide-react';

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
    justifyContent: 'flex-end',
    opacity: 0,
    animation: '$fadeIn 0.3s forwards',
  },
  modal: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'white',
    height: '100%',
    boxShadow: '-10px 0 25px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateX(100%)',
    animation: '$slideIn 0.3s 0.1s forwards',
  },
  '@keyframes fadeIn': {
    to: { opacity: 1 },
  },
  '@keyframes slideIn': {
    to: { transform: 'translateX(0)' },
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6B7280',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    '&:hover': {
      backgroundColor: '#F3F4F6',
      color: '#EF4444',
    },
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
  },
  itemCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '1rem',
    border: '1px solid #E5E7EB',
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: '#4F46E5',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
  },
  itemImg: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '0.75rem',
    backgroundColor: 'white',
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: '600',
    color: '#111827',
    fontSize: '1rem',
    marginBottom: '0.25rem',
  },
  itemPrice: {
    color: '#4F46E5',
    fontWeight: '700',
    fontSize: '0.95rem',
  },
  itemMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  qtyBadge: {
    fontSize: '0.85rem',
    color: '#6B7280',
    backgroundColor: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '2rem',
    border: '1px solid #E5E7EB',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#EF4444',
    padding: '0.4rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#FEF2F2',
    },
  },
  footer: {
    padding: '1.5rem',
    borderTop: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#111827',
  },
  checkoutBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#4338CA',
    },
    '&:disabled': {
      backgroundColor: '#D1D5DB',
      cursor: 'not-allowed',
    },
  },
});

const CartModal = ({ isOpen, onClose, items = [], onRemove }) => {
  const classes = useStyles();

  if (!isOpen) return null;

  // Helper untuk membersihkan dan memparsing harga dengan lebih agresif
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;

    // Konversi ke string, hapus semua karakter kecuali angka
    // Contoh: "Rp 90.000" -> "90000"
    const cleaned = String(price).replace(/[^0-9]/g, '');

    // Parse ke float, jika gagal return 0
    return parseFloat(cleaned) || 0;
  };

  const total = items.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 1),
    0,
  );

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <div className={classes.title}>
            <ShoppingBag size={24} />
            Keranjang Belanja
          </div>
          <button className={classes.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={classes.body}>
          {items.length === 0 ? (
            <div className={classes.emptyState}>
              <ShoppingBag
                size={48}
                style={{ marginBottom: '1rem', opacity: 0.5 }}
              />
              <p>Keranjang Anda masih kosong</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id || item._id} className={classes.itemCard}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={classes.itemImg}
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div className={classes.itemInfo}>
                  <div>
                    <div className={classes.itemName}>{item.name}</div>
                    <div className={classes.itemPrice}>
                      Rp {parsePrice(item.price).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className={classes.itemMeta}>
                    <span className={classes.qtyBadge}>
                      Qty: {item.quantity || 1}
                    </span>
                    <button
                      className={classes.removeBtn}
                      onClick={() => onRemove(item.id || item._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={classes.footer}>
          <div className={classes.totalRow}>
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <button className={classes.checkoutBtn} disabled={items.length === 0}>
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
