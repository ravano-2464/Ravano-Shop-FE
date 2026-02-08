# Ravano Shop 🛒

## 📖 Deskripsi

**Ravano Shop** adalah aplikasi web E-Commerce modern yang dibangun menggunakan library **React** dan build tool **Vite**. Proyek ini difokuskan pada pengembangan antarmuka pengguna (Front-End) yang responsif, cepat, dan interaktif untuk pengalaman berbelanja online yang mulus.

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi utama berikut:

* **[React](https://reactjs.org/)** - Library JavaScript untuk membangun antarmuka pengguna.
* **[Vite](https://vitejs.dev/)** - Build tool frontend generasi berikutnya yang super cepat.
* **JavaScript (ES6+)** - Bahasa pemrograman utama.
* **CSS / Styling** - (Dapat disesuaikan: Misalnya CSS Modules, Tailwind, atau Styled Components).
* **ESLint** - Untuk menjaga kualitas dan konsistensi kode.

## ✨ Fitur Utama

Berikut adalah beberapa fitur yang tersedia dalam aplikasi ini:

* ✅ **Katalog Produk** - Menampilkan daftar produk dengan gambar dan harga.
* ✅ **Detail Produk** - Halaman informasi lengkap untuk setiap item.
* ✅ **Keranjang Belanja (Cart)** - Menambah dan mengelola item belanjaan.
* ✅ **Responsif** - Tampilan yang optimal di Desktop, Tablet, dan Mobile.
* ✅ **Navigasi Cepat** - Menggunakan routing sisi klien (SPA).

## 🛠️ Instalasi & Cara Menjalankan

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di komputer lokal Anda:

### Prasyarat

Pastikan Anda sudah menginstal:
* [Node.js](https://nodejs.org/) (Versi 16 atau lebih baru direkomendasikan)
* npm atau yarn

### Langkah-langkah

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/ravano-2464/Ravano-Shop-FE.git](https://github.com/ravano-2464/Ravano-Shop-FE.git)
    cd Ravano-Shop
    ```

2.  **Instal Dependencies**
    Masuk ke direktori proyek dan instal paket yang dibutuhkan:
    ```bash
    npm install
    # atau jika menggunakan yarn
    yarn install
    ```

3.  **Jalankan Server Development**
    Mulai aplikasi dalam mode development:
    ```bash
    npm run dev
    # atau
    yarn dev
    ```

4.  **Buka di Browser**
    Aplikasi biasanya akan berjalan di `http://localhost:5173`. Cek terminal Anda untuk port yang tepat.

## 📂 Struktur Folder

```text
├── 📁 .qodo
│   ├── 📁 agents
│   └── 📁 workflows
├── 📁 public
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📁 components
│   │   ├── 📄 CartModal.jsx
│   │   ├── 📄 DeleteConfirmationModal.jsx
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 Layout.jsx
│   │   ├── 📄 LogoutConfirmationModal.jsx
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 ProtectedRoute.jsx
│   │   ├── 📄 QuantityModal.jsx
│   │   ├── 📄 ReceiptModal.jsx
│   │   └── 📄 TopUpModal.jsx
│   ├── 📁 context
│   │   ├── 📄 AuthContext.jsx
│   │   ├── 📄 CartContext.jsx
│   │   └── 📄 LanguageContext.jsx
│   ├── 📁 hooks
│   │   ├── 📁 Auth
│   │   │   └── 📄 useAuth.js
│   │   ├── 📁 Cart
│   │   │   └── 📄 useCart.js
│   │   └── 📁 Products
│   │       └── 📄 useProducts.js
│   ├── 📁 pages
│   │   ├── 📄 DashboardMonitoring.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 NotFound.jsx
│   │   ├── 📄 ProductDetail.jsx
│   │   ├── 📄 ProductEdit.jsx
│   │   ├── 📄 ProductForm.jsx
│   │   ├── 📄 ProductList.jsx
│   │   └── 📄 Register.jsx
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   ├── 📄 main.jsx
│   └── 📄 theme.js
├── ⚙️ .eslintrc.json
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ vercel.json
└── 📄 vite.config.js
````

## 🤝 Kontribusi

Kontribusi selalu diterima\! Jika Anda ingin berkontribusi:

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4.  Push ke branch tersebut (`git push origin fitur-keren`).
5.  Buat Pull Request.

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](https://www.google.com/search?q=LICENSE).

Dibuat dengan ❤️ oleh [Ravano-2464](https://www.google.com/search?q=https://github.com/ravano-2464)
