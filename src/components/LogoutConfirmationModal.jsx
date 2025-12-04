import React from 'react';
import { createUseStyles } from 'react-jss';
import { useLanguage } from '../context/LanguageContext';

const useStyles = createUseStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
    animation: '$fadeIn 0.2s ease',
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    textAlign: 'center',
    transform: 'scale(1)',
    animation: '$scaleIn 0.2s ease',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.75rem',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  message: {
    color: '#4B5563',
    marginBottom: '2rem',
    lineHeight: '1.5',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  btn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    flex: 1,
    fontSize: '0.95rem',
  },
  btnCancel: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    '&:hover': {
      backgroundColor: '#E5E7EB',
    },
  },
  btnConfirm: {
    backgroundColor: '#EF4444',
    color: 'white',
    boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)',
    '&:hover': {
      backgroundColor: '#DC2626',
      boxShadow: '0 4px 12px -1px rgba(239, 68, 68, 0.5)',
    },
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes scaleIn': {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
});

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const classes = useStyles();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={classes.title}>{t.nav.logoutConfirmTitle}</h2>
        <p className={classes.message}>{t.nav.logoutConfirmMsg}</p>
        <div className={classes.actions}>
          <button
            className={`${classes.btn} ${classes.btnCancel}`}
            onClick={onClose}
          >
            {t.common.cancel}
          </button>
          <button
            className={`${classes.btn} ${classes.btnConfirm}`}
            onClick={onConfirm}
          >
            {t.nav.logout}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
