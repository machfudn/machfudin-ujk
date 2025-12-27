# Frontend Aplikasi Data Siswa - Ujian Sertifikasi Pengembangan Web dengan Node Js dan React

Repository ini berisi source code **Frontend** (Client Side) untuk antarmuka aplikasi Data Siswa. Dibangun menggunakan **React.js** (Vite) dan **Bootstrap** untuk tampilan yang responsif dan modern.

## Fitur Antarmuka (UI/UX)

- **Auto Code Display**: Menampilkan Kode Siswa otomatis (SXXX) dengan tampilan disable agar user paham bahwa kode dibuat oleh sistem.
- **Validasi & Notifikasi**: Menampilkan pesan pop-up (Sukses/Gagal) yang informatif, termasuk menangkap pesan error dari Trigger database.
- **Responsive Design**: Tampilan rapi di layar desktop maupun mobile menggunakan Bootstrap 5.
- **Single Page Feel**: Interaksi cepat tanpa reload halaman menggunakan State Management React.

## Teknologi yang Digunakan

- **Library**: React.js v18+
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 & Bootstrap Icons
- **HTTP Client**: Axios
- **Notifikasi**: SweetAlert2

## ⚙️ Cara Instalasi & Menjalankan

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/machfudn/machfudin-ujk.git](https://github.com/machfudn/machfudin-ujk.git)
    cd machfudin-ujk
    cd frontend-siswa
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Jalankan Aplikasi**
    ```bash
    npm run dev
    ```
    Aplikasi biasanya berjalan di `http://localhost:5173`.

## Catatan Penggunaan

Pastikan **Server Backend** sudah berjalan di port `3000` sebelum menjalankan frontend ini, agar data bisa diambil dari database.

---

**Created by:** Machfudin
