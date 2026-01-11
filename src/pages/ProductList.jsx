import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { ShoppingCart, Zap, Eye, Edit, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useProducts from '../hooks/Products/useProducts';
import { useCart } from '../hooks/Cart/useCart';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ReceiptModal from '../components/ReceiptModal';
import QuantityModal from '../components/QuantityModal';

const useStyles = createUseStyles({
  page: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  titleGroup: {
    '& h1': {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '0.5rem',
    },
    '& p': {
      color: '#6B7280',
      fontSize: '1rem',
    },
  },
  addButton: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    textDecoration: 'none',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      backgroundColor: '#4338CA',
      transform: 'translateY(-2px)',
    },
  },
  controls: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '2fr 1fr 1fr',
    },
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    fontSize: '0.95rem',
    outline: 'none',
    '&:focus': {
      borderColor: '#4F46E5',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      borderColor: '#4F46E5',
    },
  },
  badgesContainer: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 10,
    display: 'flex',
    gap: '0.5rem',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  badgePublic: { backgroundColor: '#10B981' },
  badgePrivate: { backgroundColor: '#6B7280' },
  badgeStock: { backgroundColor: '#F59E0B', color: 'black' },
  imageWrapper: {
    height: '240px',
    backgroundColor: '#F3F4F6',
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  productName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.25rem',
    lineHeight: 1.4,
  },
  creatorInfo: {
    fontSize: '0.8rem',
    color: '#6B7280',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#4F46E5',
    marginBottom: '1rem',
  },
  description: {
    color: '#6B7280',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  cardActions: {
    marginTop: 'auto',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: '0.625rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    transition: 'colors 0.2s',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.3rem',
  },
  btnDetail: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    '&:hover': { backgroundColor: '#E5E7EB' },
  },
  btnBuy: {
    backgroundColor: '#10B981',
    color: 'white',
    '&:hover': { backgroundColor: '#059669' },
    '&:disabled': { backgroundColor: '#D1D5DB', cursor: 'not-allowed' },
  },
  btnCart: {
    backgroundColor: '#4F46E5',
    color: 'white',
    flex: 2,
    '&:hover': { backgroundColor: '#4338CA' },
    '&:disabled': { opacity: 0.7, cursor: 'not-allowed' },
  },
  btnDelete: {
    backgroundColor: '#FEF2F2',
    color: '#EF4444',
    flex: 1.5,
    '&:hover': { backgroundColor: '#FEE2E2' },
  },
  btnEdit: {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    '&:hover': { backgroundColor: '#E0E7FF' },
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '4rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '2px dashed #E5E7EB',
  },
});

const ProductList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { products, loading, deleteProduct, refetch, t } = useProducts();
  const { addToCart } = useCart();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [receiptData, setReceiptData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const [quantityModalOpen, setQuantityModalOpen] = useState(false);
  const [selectedBuyProduct, setSelectedBuyProduct] = useState(null);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatThousand = (value) => {
    if (!value && value !== 0) return '';
    const clean = String(value).replace(/\D/g, '');
    if (!clean) return '';
    return parseInt(clean, 10).toLocaleString('id-ID');
  };

  const handlePriceInput = (setter) => (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setter(formatThousand(rawValue));
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const isVisible =
        p.visibility === 'public' ||
        (p.visibility === 'private' &&
          currentUser &&
          (p.user?._id === currentUser._id ||
            p.user?.id === currentUser._id ||
            p.user === currentUser._id));

      if (!isVisible) return false;

      const matchName = p.name.toLowerCase().includes(search.toLowerCase());
      const rawPrice = parseFloat(String(p.price).replace(/[^0-9]/g, ''));

      const min = minPrice ? parseFloat(minPrice.replace(/\./g, '')) : 0;
      const max = maxPrice ? parseFloat(maxPrice.replace(/\./g, '')) : Infinity;

      return matchName && rawPrice >= min && rawPrice <= max;
    });
  }, [products, search, minPrice, maxPrice, currentUser]);

  const handleAddToCart = (product) => {
    const cleanPrice = parseFloat(String(product.price).replace(/[^0-9]/g, ''));
    const productToAdd = {
      ...product,
      price: isNaN(cleanPrice) ? 0 : cleanPrice,
    };
    addToCart(productToAdd);
    toast.success('Produk ditambahkan ke keranjang');
  };

  const handleBuyDirectClick = (product) => {
    if (product.stock <= 0) {
      toast.error('Stok habis!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    setSelectedBuyProduct(product);
    setQuantityModalOpen(true);
  };

  const handleBuyDirect = async (quantity) => {
    if (!selectedBuyProduct) return;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    const toastId = toast.loading('Memproses transaksi...');

    try {
      const cleanPrice = parseFloat(
        String(selectedBuyProduct.price).replace(/[^0-9]/g, ''),
      );
      const payload = {
        items: [
          {
            id: selectedBuyProduct.id || selectedBuyProduct._id,
            quantity: quantity,
            name: selectedBuyProduct.name,
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
      setSelectedBuyProduct(null);
      toast.success('Pembelian Berhasil!', { id: toastId });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transaksi gagal', {
        id: toastId,
      });
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      const toastId = toast.loading('Menghapus produk...');
      try {
        await deleteProduct(selectedProduct.id || selectedProduct._id);
        toast.success('Produk berhasil dihapus!', { id: toastId });
        refetch();
      } catch {
        toast.error('Gagal menghapus produk', { id: toastId });
      }
    }
    setModalOpen(false);
  };

  if (loading) return <div className="p-10 text-center">{t.list.loading}</div>;

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.titleGroup}>
            <h1>{t.list.title}</h1>
            <p>{t.list.subtitle}</p>
          </div>
          <Link to="/add-products" className={classes.addButton}>
            <Plus size={20} />
            {t.list.addBtn}
          </Link>
        </div>

        <div className={classes.controls}>
          <input
            type="text"
            placeholder={t.list.search}
            className={classes.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder={t.list.minPrice}
            className={classes.searchInput}
            value={minPrice}
            onChange={handlePriceInput(setMinPrice)}
          />
          <input
            type="text"
            placeholder={t.list.maxPrice}
            className={classes.searchInput}
            value={maxPrice}
            onChange={handlePriceInput(setMaxPrice)}
          />
        </div>

        <div className={classes.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isOwner =
                currentUser &&
                (product.user?._id === currentUser._id ||
                  product.user?.id === currentUser._id ||
                  product.user === currentUser._id);
              return (
                <div key={product.id || product._id} className={classes.card}>
                  <div className={classes.badgesContainer}>
                    {product.visibility === 'public' ? (
                      <span
                        className={`${classes.badge} ${classes.badgePublic}`}
                      >
                        🌐 Public
                      </span>
                    ) : (
                      <span
                        className={`${classes.badge} ${classes.badgePrivate}`}
                      >
                        🔒 Private
                      </span>
                    )}
                    <span className={`${classes.badge} ${classes.badgeStock}`}>
                      📦 {formatThousand(product.stock)}
                    </span>
                  </div>

                  <div className={classes.imageWrapper}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={classes.productImage}
                      onError={(e) =>
                        (e.target.src =
                          'https://placehold.co/400?text=No+Image')
                      }
                    />
                  </div>
                  <div className={classes.cardContent}>
                    <h3 className={classes.productName}>{product.name}</h3>
                    <div className={classes.creatorInfo}>
                      <span>
                        By: <strong>{product.user?.name || 'Unknown'}</strong>
                      </span>
                      <span>Created: {formatDate(product.created_at)}</span>
                      <span>Updated: {formatDate(product.updated_at)}</span>
                    </div>
                    <div className={classes.productPrice}>
                      Rp {formatThousand(product.price)}
                    </div>
                    <p className={classes.description}>
                      {product.description || 'No description available'}
                    </p>
                    <div className={classes.cardActions}>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        className={`${classes.actionBtn} ${classes.btnCart}`}
                        title="Tambahkan ke Keranjang"
                      >
                        <ShoppingCart size={16} />
                        <span>Tambahkan Ke Keranjang</span>
                      </button>

                      <button
                        onClick={() => handleBuyDirectClick(product)}
                        disabled={product.stock <= 0}
                        className={`${classes.actionBtn} ${classes.btnBuy}`}
                      >
                        <Zap size={16} />
                        {product.stock > 0 ? t.list.buy : t.list.outOfStock}
                      </button>

                      {isOwner ? (
                        <>
                          <Link
                            to={`/edit/products/${product.id || product._id}`}
                            className={`${classes.actionBtn} ${classes.btnEdit}`}
                          >
                            <Edit size={16} />
                            {t.list.edit}
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className={`${classes.actionBtn} ${classes.btnDelete}`}
                          >
                            <Trash2 size={16} />
                            <span>Hapus Produk</span>
                          </button>
                        </>
                      ) : (
                        <Link
                          to={`/detail-products/${product.id || product._id}`}
                          className={`${classes.actionBtn} ${classes.btnDetail}`}
                        >
                          <Eye size={16} />
                          {t.list.view}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={classes.emptyState}>
              <h3 style={{ color: '#9CA3AF' }}>{t.list.empty}</h3>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t.list.confirmTitle}
        message={t.list.confirmMsg}
        data={selectedProduct}
      />

      <QuantityModal
        isOpen={quantityModalOpen}
        onClose={() => {
          setQuantityModalOpen(false);
          setSelectedBuyProduct(null);
        }}
        product={selectedBuyProduct}
        onConfirm={handleBuyDirect}
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

export default ProductList;
