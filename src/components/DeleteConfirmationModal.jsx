import React from 'react';
import { createUseStyles } from 'react-jss';
import { AlertTriangle, X } from 'lucide-react';

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    animation: '$fadeIn 0.2s forwards',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    width: '90%',
    maxWidth: '400px',
    padding: '1.5rem',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'scale(0.95)',
    animation: '$scaleIn 0.2s 0.1s forwards',
    position: 'relative',
  },
  '@keyframes fadeIn': {
    to: { opacity: 1 },
  },
  '@keyframes scaleIn': {
    to: { transform: 'scale(1)' },
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9CA3AF',
    '&:hover': { color: '#6B7280' },
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  iconWrapper: {
    backgroundColor: '#FEF2F2',
    padding: '0.75rem',
    borderRadius: '50%',
    color: '#DC2626',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  message: {
    fontSize: '0.95rem',
    color: '#6B7280',
    lineHeight: '1.5',
    margin: 0,
  },  
  previewBox: {
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    textAlign: 'left',
    marginTop: '0.5rem',
  },
  previewImg: {
    width: '48px',
    height: '48px',
    borderRadius: '0.5rem',
    objectFit: 'cover',
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
  },
  previewInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  previewName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#111827',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  previewPrice: {
    fontSize: '0.85rem',
    color: '#6B7280',
    marginTop: '0.1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    width: '100%',
    marginTop: '1.5rem',
  },
  btn: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
  },
  btnCancel: {
    backgroundColor: 'white',
    border: '1px solid #D1D5DB',
    color: '#374151',
    '&:hover': { backgroundColor: '#F3F4F6' },
  },
  btnConfirm: {
    backgroundColor: '#DC2626',
    color: 'white',
    '&:hover': { backgroundColor: '#B91C1C' },
  },
});

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  data,
}) => {
  const classes = useStyles();

  if (!isOpen) return null;

  // Helper untuk format harga
  const formatPrice = (price) => {
    return price
      ? parseInt(String(price).replace(/\D/g, '') || 0).toLocaleString('id-ID')
      : '0';
  };

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={classes.content}>
          <div className={classes.iconWrapper}>
            <AlertTriangle size={32} />
          </div>

          <h3 className={classes.title}>{title || 'Konfirmasi Hapus'}</h3>

          <p className={classes.message}>
            {message ||
              'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.'}
          </p>

          {data && (
            <div className={classes.previewBox}>
              <img
                src={data.imageUrl || 'https://placehold.co/400?text=No+Image'}
                alt={data.name}
                className={classes.previewImg}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <div className={classes.previewInfo}>
                <span className={classes.previewName}>{data.name}</span>
                <span className={classes.previewPrice}>
                  Rp {formatPrice(data.price)}
                </span>
              </div>
            </div>
          )}

          <div className={classes.actions}>
            <button
              className={`${classes.btn} ${classes.btnCancel}`}
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className={`${classes.btn} ${classes.btnConfirm}`}
              onClick={onConfirm}
            >
              Hapus Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
