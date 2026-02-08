import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { ShoppingBag, Package, Calendar, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const useStyles = createUseStyles({
  page: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconBlue: {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
  },
  statIconGreen: {
    backgroundColor: '#ECFDF5',
    color: '#059669',
  },
  statIconPurple: {
    backgroundColor: '#F5F3FF',
    color: '#7C3AED',
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  transactionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: '#4F46E5',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
  },
  transactionHeader: {
    padding: '1.25rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #E5E7EB',
  },
  transactionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  transactionId: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  transactionDate: {
    fontSize: '0.9rem',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  transactionTotal: {
    textAlign: 'right',
  },
  totalLabel: {
    fontSize: '0.75rem',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#4F46E5',
  },
  expandBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6B7280',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
  },
  transactionItems: {
    padding: '1.5rem',
  },
  itemCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.75rem',
    marginBottom: '0.75rem',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  itemImage: {
    width: '60px',
    height: '60px',
    borderRadius: '0.5rem',
    objectFit: 'cover',
    backgroundColor: '#E5E7EB',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.25rem',
  },
  itemMeta: {
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  itemPrice: {
    textAlign: 'right',
    fontWeight: '600',
    color: '#4F46E5',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '2px dashed #E5E7EB',
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#F3F4F6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    color: '#9CA3AF',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  emptyText: {
    color: '#6B7280',
    maxWidth: '300px',
    margin: '0 auto',
  },
  loadingState: {
    textAlign: 'center',
    padding: '4rem',
    color: '#6B7280',
  },
});

const PurchaseHistory = () => {
  const classes = useStyles();
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error(t.history.fetchError, { id: 'fetch-history-error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString('id-ID');
  };

  const totalSpent = transactions.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
  const totalItems = transactions.reduce(
    (acc, t) => acc + (t.items?.length || 0),
    0
  );

  if (loading) {
    return (
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.loadingState}>
            <p>{t.history.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>
            <ShoppingBag size={32} />
            {t.history.title}
          </h1>
          <p className={classes.subtitle}>
            {t.history.subtitle}
          </p>
        </div>

        <div className={classes.statsGrid}>
          <div className={classes.statCard}>
            <div className={`${classes.statIcon} ${classes.statIconBlue}`}>
              <Package size={24} />
            </div>
            <div className={classes.statInfo}>
              <div className={classes.statValue}>{transactions.length}</div>
              <div className={classes.statLabel}>{t.history.totalTransactions}</div>
            </div>
          </div>
          <div className={classes.statCard}>
            <div className={`${classes.statIcon} ${classes.statIconGreen}`}>
              <CreditCard size={24} />
            </div>
            <div className={classes.statInfo}>
              <div className={classes.statValue}>Rp {formatPrice(totalSpent)}</div>
              <div className={classes.statLabel}>{t.history.totalSpent}</div>
            </div>
          </div>
          <div className={classes.statCard}>
            <div className={`${classes.statIcon} ${classes.statIconPurple}`}>
              <ShoppingBag size={24} />
            </div>
            <div className={classes.statInfo}>
              <div className={classes.statValue}>{totalItems}</div>
              <div className={classes.statLabel}>{t.history.productsBought}</div>
            </div>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className={classes.emptyState}>
            <div className={classes.emptyIcon}>
              <ShoppingBag size={40} />
            </div>
            <h3 className={classes.emptyTitle}>{t.history.noTransactions}</h3>
            <p className={classes.emptyText}>
              {t.history.noTransactionsDesc}
            </p>
          </div>
        ) : (
          <div className={classes.transactionList}>
            {transactions.map((transaction) => {
              const isExpanded = expandedIds.includes(transaction._id || transaction.id);
              return (
                <div
                  key={transaction._id || transaction.id}
                  className={classes.transactionCard}
                >
                  <div
                    className={classes.transactionHeader}
                    onClick={() => toggleExpand(transaction._id || transaction.id)}
                  >
                    <div className={classes.transactionInfo}>
                      <div className={classes.transactionId}>
                        #{(transaction._id || transaction.id).slice(-8).toUpperCase()}
                      </div>
                      <div className={classes.transactionDate}>
                        <Calendar size={14} />
                        {formatDate(transaction.createdAt || transaction.created_at)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className={classes.transactionTotal}>
                        <div className={classes.totalLabel}>{t.history.total}</div>
                        <div className={classes.totalValue}>
                          Rp {formatPrice(transaction.totalAmount)}
                        </div>
                      </div>
                      <button className={classes.expandBtn}>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={classes.transactionItems}>
                      {transaction.items?.map((item, idx) => (
                        <div key={idx} className={classes.itemCard}>
                          <img
                            src={item.product?.imageUrl || 'https://placehold.co/60?text=No+Image'}
                            alt={item.name}
                            className={classes.itemImage}
                            onError={(e) => (e.target.src = 'https://placehold.co/60?text=No+Image')}
                          />
                          <div className={classes.itemInfo}>
                            <div className={classes.itemName}>{item.name}</div>
                            <div className={classes.itemMeta}>
                            {t.history.qty}: {item.quantity} × Rp {formatPrice(item.price)}
                            </div>
                          </div>
                          <div className={classes.itemPrice}>
                            Rp {formatPrice(item.quantity * item.price)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
