# Ujian Sertifikasi Pengembangan Web dengan Node Js dan React

Repository ini berisi source code **Backend dan Frontend** . Frontend(Client Side) untuk antarmuka aplikasi Data Siswa Frontend menggunakan **React.js** (Vite) dan **Bootstrap** untuk tampilan yang responsif dan modern. Backend(Server Side) untuk aplikasi manajemen data siswa. Backend menggunakan **Node.js**, **Express**, dan database **MySQL** dengan penerapan fitur database lanjutan.

## Fitur yang dimiliki

### Frontend

#### Fitur Antarmuka (UI/UX)

- **Auto Code Display**: Menampilkan Kode Siswa otomatis (SXXX) dengan tampilan disable agar user paham bahwa kode dibuat oleh sistem.
- **Validasi & Notifikasi**: Menampilkan pesan pop-up (Sukses/Gagal) yang informatif, termasuk menangkap pesan error dari Trigger database jika ada data ganda.
- **Responsive Design**: Tampilan rapi di layar desktop maupun mobile menggunakan Bootstrap 5.
- **Single Page Feel**: Interaksi cepat tanpa reload halaman menggunakan State Management React.

### Backend

Backend ini tidak hanya menggunakan query standar, tetapi juga menerapkan standar keamanan dan integritas data tinggi sesuai kriteria kelulusan:

- **Stored Procedure**: Digunakan untuk proses _Insert Data_ (`CALL tambah_siswa`) agar lebih aman dan terstruktur.
- **Trigger Database**:
  - **Auto Generate Kode**: Kode siswa (SXXX) dibuat otomatis oleh database menggunakan fungsi `kode_siswa()`, bukan input manual.
- **MySQL Function**: Menggunakan fungsi kustom `total_siswa()` untuk menghitung statistik data.
- **Database Transaction**: Menerapkan `Begin Transaction`, `Commit`, dan `Rollback` untuk menjamin integritas data saat operasi Create/Update.
- **OOP Pattern**: Menggunakan konsep _Object Oriented Programming_ dengan Class Controller (`siswaController.js`).

## Teknologi yang Digunakan

### Frontend

- **Library**: React.js v18+
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 & Bootstrap Icons
- **HTTP Client**: Axios
- **Notifikasi**: SweetAlert2

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Library**: `mysql2`, `cors`, `nodemon`

## Cara Instalasi & Menjalankan

### Backend

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/machfudn/machfudin-ujk.git](https://github.com/machfudn/machfudin-ujk.git)
    cd machfudin-ujk
    cd backend-siswa
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Setup Database (PENTING)**

    - Buat database baru di MySQL bernama `db_sekolah`.
    - Jalankan script SQL yang tersedia (pastikan Trigger dan Stored Procedure ikut ter-install).
    - Sesuaikan konfigurasi database di file `db.js` (Username/Password).

4.  **Jalankan Server**
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.

---

### Frontend

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

---

## End Point Backend

| Method   | Endpoint                 | Deskripsi                                   |
| :------- | :----------------------- | :------------------------------------------ |
| `GET`    | `/api/siswa`             | Mengambil semua data siswa                  |
| `GET`    | `/api/siswa/total-siswa` | Mengambil total data siswa via function     |
| `GET`    | `/api/siswa/next-kode`   | Mengambil next kode data siswa via function |
| `GET`    | `/api/siswa/:id`         | Mengambil data siswa berdasarkan id         |
| `POST`   | `/api/siswa`             | Menambah siswa baru (via Stored Procedure)  |
| `PUT`    | `/api/siswa/:id`         | Mengupdate data siswa                       |
| `DELETE` | `/api/siswa/:id`         | Menghapus data siswa                        |

---

## Catatan Penggunaan Frontend

Pastikan **Server Backend** sudah berjalan di port `3000` sebelum menjalankan frontend ini, agar data bisa diambil dari database.

---

**Created by:** Machfudin
