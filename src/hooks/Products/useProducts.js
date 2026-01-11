import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/products`;

const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') return '';
  const cleanValue = String(value).replace(/\D/g, '');
  if (!cleanValue) return '';
  return Number(cleanValue).toLocaleString('id-ID');
};

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const useProducts = (id = null) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
    visibility: 'public',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'stock') {
      setFormData((prev) => ({
        ...prev,
        [name]: formatPrice(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      const normalizedProducts = response.data.map((product) => ({
        ...product,
        id: product._id || product.id,
      }));
      setProducts(normalizedProducts);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      toast.error('Gagal memuat daftar produk');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductDetail = useCallback(async (productId) => {
    if (!productId || productId === 'undefined' || productId === 'null') {
      setProductDetail(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/${productId}`);
      const normalizedProduct = {
        ...response.data,
        id: response.data._id || response.data.id,
      };
      setProductDetail(normalizedProduct);

      setFormData({
        ...normalizedProduct,
        price: formatPrice(normalizedProduct.price),
        stock: formatPrice(normalizedProduct.stock),
        visibility: normalizedProduct.visibility,
      });
    } catch (err) {
      setError(err.message);
      setProductDetail(null);
      toast.error('Gagal memuat detail produk');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (productData) => {
    const loadingToast = toast.loading('Membuat produk...');
    try {
      setLoading(true);
      setError(null);
      const config = { headers: getAuthHeader() };
      const response = await axios.post(API_URL, productData, config);
      await fetchProducts();
      toast.success('Produk berhasil dibuat!', { id: loadingToast });
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error('Gagal membuat produk: ' + err.response?.data?.error, {
        id: loadingToast,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, productData) => {
    if (!productId) {
      toast.error('ID produk tidak valid');
      return;
    }

    const loadingToast = toast.loading('Memperbarui produk...');
    try {
      setLoading(true);
      setError(null);
      const config = { headers: getAuthHeader() };
      const response = await axios.put(
        `${API_URL}/${productId}`,
        productData,
        config,
      );
      await fetchProducts();
      toast.success('Produk berhasil diperbarui!', { id: loadingToast });
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error('Gagal memperbarui produk: ' + err.response?.data?.error, {
        id: loadingToast,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!productId) {
      toast.error('ID produk tidak valid');
      return;
    }

    const loadingToast = toast.loading('Menghapus produk...');
    try {
      setLoading(true);
      setError(null);
      const config = { headers: getAuthHeader() };
      await axios.delete(`${API_URL}/${productId}`, config);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
      toast.error('Gagal menghapus produk: ' + err.response?.data?.error, {
        id: loadingToast,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const buyProduct = async (productId) => {
    if (!productId) return;
    const loadingToast = toast.loading('Memproses pembelian...');
    try {
      setLoading(true);
      const config = { headers: getAuthHeader() };
      const response = await axios.post(
        `${API_URL}/${productId}/buy`,
        {},
        config,
      );

      if (
        productDetail &&
        (productDetail.id === productId || productDetail._id === productId)
      ) {
        setProductDetail({
          ...response.data,
          id: response.data._id || response.data.id,
        });
      }

      await fetchProducts();
      toast.success(t.list.buySuccess, { id: loadingToast });
      return response.data;
    } catch (err) {
      toast.error(
        'Gagal membeli: ' + (err.response?.data?.error || err.message),
        {
          id: loadingToast,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.imageUrl ||
      !formData.stock
    )
      return;

    const rawPrice = String(formData.price).replace(/\D/g, '');
    const rawStock = String(formData.stock).replace(/\D/g, '');
    const payload = {
      ...formData,
      price: rawPrice ? Number(rawPrice) : 0,
      stock: rawStock ? Number(rawStock) : 0,
    };

    try {
      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/list-products');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id && id !== 'undefined' && id !== 'null') {
      fetchProductDetail(id);
    } else if (id === null) {
      fetchProducts();
    }
  }, [id, fetchProductDetail, fetchProducts]);

  return {
    products,
    productDetail,
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    deleteProduct,
    createProduct,
    buyProduct,
    refetch: id ? () => fetchProductDetail(id) : fetchProducts,
    t,
  };
};

export default useProducts;
