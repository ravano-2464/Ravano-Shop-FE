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
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    borderBottom: '2px dashed #E5E7EB',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  title: { fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' },
  meta: { fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #E5E7EB',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  btn: {
    width: '100%',
    marginTop: '2rem',
    padding: '0.75rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
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
            {new Date(transaction.createdAt).toLocaleString()}
          </div>
        </div>

        <div>
          {transaction.items.map((item, idx) => (
            <div key={idx} className={classes.itemRow}>
              <span>
                {item.name} x {item.quantity}
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
