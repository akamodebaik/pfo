# AKA Portfolio Website

Portfolio website modern dengan UI premium gold-themed, fitur animasi mulus, dan halaman admin untuk mengelola konten.

![AKA Portfolio Website](https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

## 🚀 Fitur

- **UI Premium**: Desain elegant dengan aksen gold, animasi mulus menggunakan Framer Motion
- **Fully Responsive**: Tampilan yang dioptimalkan untuk semua perangkat (mobile, tablet, dan desktop)
- **Fitur Real-time**: Jam, tanggal, status baterai, alamat IP, dan penghitung pengunjung
- **Admin Dashboard**: Panel kontrol untuk mengelola konten portfolio
- **Login System**: Sistem login aman untuk akses admin
- **Multi-language**: Dukungan bahasa Indonesia dan Inggris
- **Background Music**: Musik latar yang dapat diaktifkan/nonaktifkan
- **Animasi**: Preloader animasi, efek transisi halaman, dan progress bar saat scrolling

## 🔧 Teknologi Utama

- **Frontend**: React + Vite, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: Express server dengan penyimpanan in-memory
- **Animasi**: Studio Freight Lenis (smooth scrolling), dan Framer Motion
- **State Management**: React Context API, React Query
- **Routing**: Wouter untuk navigasi sisi klien

## 📋 Struktur Proyek

- `client/` - Kode frontend React
  - `src/components/` - Komponen UI
  - `src/pages/` - Halaman aplikasi
  - `src/data/` - Data statis untuk proyek dan skills
  - `src/hooks/` - Custom React hooks
  - `src/contexts/` - Context providers
- `server/` - Kode backend Express
- `shared/` - Skema data bersama

## 📌 Kredensial Admin

Untuk mengakses Admin Dashboard, gunakan kredensial berikut:

- **Username**: admin
- **Password**: AkaAdminPass123

> Anda dapat mengubah kredensial admin di file `client/src/config/site.ts`

## 🔄 API Endpoints

- `GET /api/visitor-count` - Mendapatkan jumlah pengunjung
- `POST /api/login` - Endpoint autentikasi admin

## 🖥️ Deployment

Website ini siap untuk di-deploy menggunakan platform berikut:

- **Vercel** - Untuk hosting statis dan serverless functions
- **GitHub Pages** - Untuk hosting statis
- **Railway** - Untuk aplikasi fullstack dengan database
- **Glitch** - Untuk deployment cepat dan kolaborasi

## 🚀 Cara Menjalankan

1. Clone repositori:
```bash
git clone <repository-url>
cd aka-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm run dev
```

## 🎨 Kostumisasi

### Menggunakan File Konfigurasi

Website ini dirancang untuk dapat dengan mudah dikustomisasi melalui file konfigurasi:

1. **Pengaturan Umum Website**: Edit file `client/src/config/site.ts`
   - Mengubah nama, judul, dan deskripsi
   - Mengkustomisasi warna dan tema
   - Mengubah informasi kontak dan media sosial
   - Mengubah kredensial admin
   - Mengatur musik latar belakang
   - Mengubah bahasa default (en/id)

2. **Konten Website**: Edit file `client/src/config/content.ts`
   - Mengubah konten bagian "About Me"
   - Mengkustomisasi daftar skill dan persentasenya
   - Mengedit data proyek yang ditampilkan
   - Mengubah daftar teman/kolaborator

### Menggunakan Admin Dashboard

Untuk mengubah konten secara langsung tanpa mengedit kode:

1. Login ke Admin Dashboard menggunakan kredensial admin
2. Navigasi ke berbagai tab untuk mengelola konten
3. Simpan perubahan yang akan segera terlihat di website

## 📝 Lisensi

Dikembangkan oleh Aka © 2025

---

## 💎 Fitur Premium

- Integrasi dengan API eksternal untuk data real-time
- Fitur berbagi otomatis ke platform media sosial
- Animasi dan efek visual premium
- Pemberitahuan email untuk pesan kontak baru
