import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: '$fadeIn 0.3s ease-out',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  header: {
    textAlign: 'center',
    borderBottom: '2px dashed #E5E7EB',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  title: { fontSize: '1.5rem', fontWeight: '800', color: '#111827' },
  meta: { fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' },
  content: {
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '1rem',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
    color: '#374151',
  },
  itemName: { fontWeight: '500' },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #E5E7EB',
    fontWeight: '800',
    fontSize: '1.25rem',
    color: '#111827',
  },
  btn: {
    width: '100%',
    marginTop: '1.5rem',
    padding: '0.75rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    '&:hover': { backgroundColor: '#4338CA' },
  },
});

const ReceiptModal = ({ transaction, onClose }) => {
  const classes = useStyles();
  if (!transaction) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <div className={classes.title}>KWITANSI PEMBAYARAN</div>
          <div className={classes.meta}>#{transaction.invoiceNumber}</div>
          <div className={classes.meta}>
            {new Date(transaction.createdAt).toLocaleString('id-ID')}
          </div>
        </div>

        <div className={classes.content}>
          {transaction.items.map((item, idx) => (
            <div key={idx} className={classes.itemRow}>
              <span className={classes.itemName}>
                {item.name}{' '}
                <span style={{ color: '#6B7280' }}>x{item.quantity}</span>
              </span>
              <span>
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>

        <div className={classes.totalRow}>
          <span>TOTAL</span>
          <span>Rp {transaction.totalAmount.toLocaleString('id-ID')}</span>
        </div>

        <button onClick={onClose} className={classes.btn}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
