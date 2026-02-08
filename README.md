# 🛒 Ravano Shop

<div align="center">
  
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Aplikasi E-Commerce Modern dengan React + Vite**

[Demo Live](https://ravano-shop.vercel.app) • [Dokumentasi](#-instalasi--cara-menjalankan) • [Kontribusi](#-kontribusi)

</div>

---

## 📖 Tentang Project

**Ravano Shop** adalah aplikasi web E-Commerce modern yang dibangun dengan **React** dan **Vite**. Fokus pada pengalaman pengguna yang responsif, cepat, dan interaktif untuk berbelanja online.

## 🚀 Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| ⚛️ **React** | Library JavaScript untuk UI |
| ⚡ **Vite** | Build tool super cepat |
| 🎨 **React-JSS** | CSS-in-JS styling |
| 🔄 **React Router** | Client-side routing |
| 🔥 **React Hot Toast** | Notifikasi modern |
| 📊 **Axios** | HTTP client |
| 🔍 **LogRocket** | Session replay & monitoring |

## ✨ Fitur Utama

- ✅ **Katalog Produk** - Menampilkan daftar produk dengan gambar, harga, dan stok
- ✅ **Detail Produk** - Halaman informasi lengkap untuk setiap produk
- ✅ **Keranjang Belanja** - Tambah produk ke keranjang dan kelola item belanjaan
- ✅ **Checkout Langsung** - Beli produk secara langsung dengan modal konfirmasi
- ✅ **Riwayat Pembelian** - Lihat semua transaksi dan produk yang telah dibeli
- ✅ **CRUD Produk** - Tambah, edit, dan hapus produk (untuk pemilik)
- ✅ **Dashboard Monitoring** - Pantau aktivitas dan statistik
- ✅ **Autentikasi** - Login & Register dengan JWT
- ✅ **Multi-bahasa** - Dukungan bahasa Indonesia & English
- ✅ **Top Up Saldo** - Isi ulang saldo untuk berbelanja
- ✅ **Responsif** - Optimal di Desktop, Tablet, dan Mobile

## 📂 Struktur Folder

```
frontend/
├── public/             # Aset statis
├── src/
│   ├── assets/         # Gambar dan style
│   ├── components/     # Komponen reusable
│   │   ├── CartModal.jsx
│   │   ├── DeleteConfirmationModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── LogoutConfirmationModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── QuantityModal.jsx
│   │   ├── ReceiptModal.jsx
│   │   └── TopUpModal.jsx
│   ├── context/        # React Context
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── LanguageContext.jsx
│   ├── hooks/          # Custom Hooks
│   │   ├── Auth/
│   │   ├── Cart/
│   │   └── Products/
│   ├── pages/          # Halaman aplikasi
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductEdit.jsx
│   │   ├── PurchaseHistory.jsx
│   │   ├── DashboardMonitoring.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## 🛠️ Instalasi & Cara Menjalankan

### Prasyarat

- [Node.js](https://nodejs.org/) v16+
- npm atau yarn

### Langkah-langkah

1. **Clone Repository**
   ```bash
   git clone https://github.com/ravano-2464/Ravano-Shop-FE.git
   cd Ravano-Shop-FE
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   
   Buat file `.env` di root folder:
   ```env
   VITE_API_BASE_URL=https://api.example.com
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

5. **Buka Browser**
   
   Akses aplikasi di `http://localhost:5173`

## 📜 Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run lint` | Jalankan ESLint |

## 🤝 Kontribusi

Kontribusi selalu diterima! Ikuti langkah berikut:

1. Fork repository ini
2. Buat branch fitur: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -m 'Tambah fitur baru'`
4. Push ke branch: `git push origin fitur-baru`
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">
  
Dibuat dengan ❤️ oleh [Ravano-2464](https://github.com/ravano-2464)

⭐ Star repository ini jika bermanfaat!

</div>
