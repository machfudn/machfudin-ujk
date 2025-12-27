# Backend Aplikasi Data Siswa (API) - Ujian Sertifikasi Pengembangan Web dengan Node Js dan React
Repository ini berisi source code **Backend** (Server Side) untuk aplikasi manajemen data siswa. Dibangun menggunakan **Node.js**, **Express**, dan database **MySQL** dengan penerapan fitur database lanjutan.

## Fitur yang dimiliki

Backend ini tidak hanya menggunakan query standar, tetapi juga menerapkan standar keamanan dan integritas data tinggi sesuai kriteria kelulusan:

- **Stored Procedure**: Digunakan untuk proses _Insert Data_ (`CALL tambah_siswa`) agar lebih aman dan terstruktur.
- **Trigger Database**:
  - **Auto Generate Kode**: Kode siswa (SXXX) dibuat otomatis oleh database menggunakan fungsi `kode_siswa()`, bukan input manual.
- **MySQL Function**: Menggunakan fungsi kustom `total_siswa()` untuk menghitung statistik data.
- **OOP Pattern**: Menggunakan konsep _Object Oriented Programming_ dengan Class Controller (`siswaController.js`).

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Library**: `mysql2`, `cors`, `nodemon`

## Cara Instalasi & Menjalankan

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

## End Point

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

**Created by:** Machfudin
