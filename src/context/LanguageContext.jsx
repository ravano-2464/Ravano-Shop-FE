import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    common: {
      public: 'Public',
      private: 'Private',
      created: 'Created',
      updated: 'Updated',
      by: 'By',
      unknown: 'Unknown',
      cancel: 'Cancel',
      delete: 'Delete',
      warning: 'Warning',
    },
    nav: {
      title: 'MyStore',
      home: 'Home',
      catalog: 'Catalog',
      add: 'Add Product',
      language: 'Language',
      cart: 'Cart',
      login: 'Sign In',
      logout: 'Logout',
      greeting: 'Hi',
      logoutConfirmTitle: 'Confirm Logout',
      logoutConfirmMsg: 'Are you sure you want to log out?',
    },
    home: {
      badge: '✨ New Collection 2025',
      titleLine1: 'Elevate Your',
      titleHighlight: 'Lifestyle',
      welcome: 'Welcome,',
      description:
        'Manage your product inventory with a modern, fast, and efficient management system.',
      exploreBtn: 'Explore Catalog',
      addBtn: 'Add Product',
      statsActive: 'Active Products',
    },
    auth: {
      loginTitle: 'Welcome Back',
      registerTitle: 'Create Account',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      emailPlaceholder: 'you@example.com',
      namePlaceholder: 'John Doe',
      signInBtn: 'Sign In',
      signingInBtn: 'Signing in...',
      signUpBtn: 'Sign Up',
      signingUpBtn: 'Creating...',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      linkLogin: 'Sign in',
      linkRegister: 'Sign up',
    },
    list: {
      title: 'Product Catalog',
      subtitle: 'Manage your inventory efficiently',
      addBtn: 'Add New Product',
      search: 'Search products...',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      empty: 'No products found',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      buy: 'Buy Now',
      buySuccess: 'Purchase successful!',
      outOfStock: 'Out of Stock',
      confirmTitle: 'Delete Product',
      confirmMsg:
        'Are you sure you want to delete this product? This action cannot be undone.',
      loading: 'Loading...',
      price: 'Price',
    },
    detail: {
      back: 'Back to Catalog',
      descLabel: 'Product Description',
      editBtn: 'Edit Product',
      buyBtn: 'Buy Now',
      closeBtn: 'Close',
      loading: 'Loading details...',
      stock: 'Stock',
      notFound: 'Product Not Found',
      notFoundDesc:
        'The product you are looking for does not exist or has been removed.',
    },
    form: {
      titleAdd: 'Create New Product',
      subtitleAdd: 'Fill in the details to add a product to your inventory.',
      titleEdit: 'Edit Product',
      subtitleEdit: 'Update product information below.',
      name: 'Product Name',
      price: 'Price (IDR)',
      image: 'Image URL',
      desc: 'Description',
      preview: 'Live Preview',
      imagePreview: 'Image Preview',
      cancel: 'Cancel',
      submit: 'Publish Product',
      save: 'Save Changes',
      placeholderName: 'e.g. Nike Air Jordan',
      placeholderDesc: 'Product details...',
      visibilityLabel: 'Visibility',
      publicOption: 'Public (Visible to everyone)',
      privateOption: 'Private (Only you)',
    },
    notFound: {
      badge: '⚠️ Error 404',
      titleLine1: 'Lost in',
      titleHighlight: 'Space?',
      description:
        'The page you are looking for was not found. You may have mistyped the address or the page has moved to another dimension.',
      backBtn: 'Back to Home',
      statsLabel: 'Page Not Found',
    },
  },
  id: {
    common: {
      public: 'Publik',
      private: 'Pribadi',
      created: 'Dibuat',
      updated: 'Diperbarui',
      by: 'Oleh',
      unknown: 'Tidak Diketahui',
      cancel: 'Batal',
      delete: 'Hapus',
      warning: 'Peringatan',
    },
    nav: {
      title: 'TokoSaya',
      home: 'Beranda',
      catalog: 'Katalog',
      add: 'Tambah Produk',
      language: 'Bahasa',
      cart: 'Keranjang',
      login: 'Masuk',
      logout: 'Keluar',
      greeting: 'Hai',
      logoutConfirmTitle: 'Konfirmasi Keluar',
      logoutConfirmMsg: 'Apakah Anda yakin ingin keluar dari akun ini?',
    },
    home: {
      badge: '✨ Koleksi Baru 2025',
      titleLine1: 'Tingkatkan',
      titleHighlight: 'Gaya Hidupmu',
      welcome: 'Selamat datang,',
      description:
        'Kelola inventaris produk Anda dengan sistem manajemen yang modern, cepat, dan efisien.',
      exploreBtn: 'Jelajahi Katalog',
      addBtn: 'Tambah Produk',
      statsActive: 'Produk Aktif',
    },
    auth: {
      loginTitle: 'Selamat Datang Kembali',
      registerTitle: 'Buat Akun',
      nameLabel: 'Nama Lengkap',
      emailLabel: 'Alamat Email',
      passwordLabel: 'Kata Sandi',
      emailPlaceholder: 'kamu@contoh.com',
      namePlaceholder: 'Budi Santoso',
      signInBtn: 'Masuk',
      signingInBtn: 'Sedang masuk...',
      signUpBtn: 'Daftar',
      signingUpBtn: 'Sedang membuat...',
      noAccount: 'Belum punya akun?',
      hasAccount: 'Sudah punya akun?',
      linkLogin: 'Masuk',
      linkRegister: 'Daftar',
    },
    list: {
      title: 'Katalog Produk',
      subtitle: 'Kelola inventaris Anda dengan efisien',
      addBtn: 'Tambah Produk',
      search: 'Cari produk...',
      minPrice: 'Harga Min',
      maxPrice: 'Harga Maks',
      empty: 'Produk tidak ditemukan',
      view: 'Lihat Produk',
      edit: 'Ubah Produk',
      delete: 'Hapus Produk',
      buy: 'Beli Sekarang',
      buySuccess: 'Pembelian berhasil!',
      outOfStock: 'Stok Habis',
      confirmTitle: 'Hapus Produk',
      confirmMsg:
        'Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.',
      loading: 'Memuat...',
      price: 'Harga',
    },
    detail: {
      back: 'Kembali ke Katalog',
      descLabel: 'Deskripsi Produk',
      editBtn: 'Ubah Produk',
      buyBtn: 'Beli Sekarang',
      closeBtn: 'Tutup',
      loading: 'Memuat detail...',
      stock: 'Stok',
      notFound: 'Produk Tidak Ditemukan',
      notFoundDesc: 'Produk yang Anda cari tidak ada atau telah dihapus.',
    },
    form: {
      titleAdd: 'Buat Produk Baru',
      subtitleAdd: 'Isi detail untuk menambahkan produk ke inventaris Anda.',
      titleEdit: 'Ubah Produk',
      subtitleEdit: 'Perbarui informasi produk di bawah ini.',
      name: 'Nama Produk',
      price: 'Harga (IDR)',
      image: 'URL Gambar',
      desc: 'Deskripsi',
      preview: 'Pratinjau Langsung',
      imagePreview: 'Pratinjau Gambar',
      cancel: 'Batal',
      submit: 'Terbitkan Produk',
      save: 'Simpan Perubahan',
      placeholderName: 'cth. Nike Air Jordan',
      placeholderDesc: 'Detail produk...',
      visibilityLabel: 'Visibilitas',
      publicOption: 'Publik (Terlihat oleh semua)',
      privateOption: 'Pribadi (Hanya Anda)',
    },
    notFound: {
      badge: '⚠️ Galat 404',
      titleLine1: 'Tersesat di',
      titleHighlight: 'Angkasa?',
      description:
        'Halaman yang Anda tuju tidak ditemukan. Mungkin salah ketik alamat atau halaman tersebut sudah dipindahkan ke dimensi lain.',
      backBtn: 'Kembali ke Beranda',
      statsLabel: 'Halaman Tidak Ditemukan',
    },
  },
};

const LanguageContext = createContext({
  language: 'id',
  toggleLanguage: () => {},
  t: translations.id,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'id',
      toggleLanguage: () => {},
      t: translations.id,
    };
  }
  return context;
};
