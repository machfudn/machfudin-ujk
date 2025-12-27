const pool = require("../config/db");

class siswaController {
  // =========================
  // GET /api/siswa
  // ambil semua siswa
  // =========================
  getAllSiswa = async (req, res, next) => {
    try {
      const [rows] = await pool.execute("SELECT * FROM siswa ORDER BY id DESC");

      res.json(rows);
    } catch (err) {
      next(err);
    }
  };

  // =========================
  // GET /api/siswa/total
  // ambil total_siswa (function)
  // =========================
  getTotalSiswa = async (req, res, next) => {
    try {
      const [result] = await pool.execute(
        "SELECT hitung_jumlah_siswa() AS total_siswa"
      );

      res.json({
        total_siswa: result[0].total_siswa,
      });
    } catch (err) {
      next(err);
    }
  };

  // =========================
  // GET /api/siswa/nextkode
  // ambil kode_siswa (function)
  // =========================
  nextKodeSiswa = async (req, res, next) => {
    try {
      const [rows] = await pool.execute(
        "SELECT next_kode_siswa() AS kode_siswa"
      );
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  };

  // =========================
  // GET /api/siswa/:id
  // =========================
  getByIdSiswa = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);

      const [rows] = await pool.execute("SELECT * FROM siswa WHERE id = ?", [
        id,
      ]);

      if (rows.length === 0)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  };

  // =========================
  // POST /api/siswa
  // INSERT via STORED PROCEDURE
  // trigger before_insert_siswa otomatis aktif
  // =========================
  createSiswa = async (req, res, next) => {
    try {
      const {
        nama_siswa,
        alamat_siswa,
        jenis_kelamin,
        jurusan_siswa,
        tgl_siswa,
      } = req.body;

      await pool.execute("CALL tambah_siswa(?, ?, ?, ?, ?)", [
        nama_siswa,
        alamat_siswa,
        jenis_kelamin,
        jurusan_siswa,
        tgl_siswa,
      ]);

      res.status(201).json({ message: "Siswa berhasil ditambahkan" });
    } catch (err) {
      // error dari TRIGGER akan masuk sini
      next(err);
    }
  };

  // =========================
  // PUT /api/siswa/:id
  // UPDATE dinamis
  // =========================
  updateSiswa = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        nama_siswa,
        alamat_siswa,
        jenis_kelamin,
        jurusan_siswa,
        tgl_siswa,
      } = req.body;

      const fields = [];
      const values = [];

      if (nama_siswa !== undefined) {
        fields.push("nama_siswa = ?");
        values.push(nama_siswa);
      }
      if (alamat_siswa !== undefined) {
        fields.push("alamat_siswa = ?");
        values.push(alamat_siswa);
      }
      if (jurusan_siswa !== undefined) {
        fields.push("jurusan_siswa = ?");
        values.push(jurusan_siswa);
      }
      if (jenis_kelamin !== undefined) {
        fields.push("jenis_kelamin = ?");
        values.push(jenis_kelamin);
      }
      if (tgl_siswa !== undefined) {
        fields.push("tgl_siswa = ?");
        values.push(tgl_siswa);
      }

      if (fields.length === 0)
        return res.status(400).json({ message: "Nothing to update" });

      values.push(id);

      const sql = `UPDATE siswa SET ${fields.join(", ")} WHERE id = ?`;
      const [result] = await pool.execute(sql, values);

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      res.json({ message: "Data siswa diperbarui" });
    } catch (err) {
      next(err);
    }
  };

  // =========================
  // DELETE /api/siswa/:id
  // =========================
  deleteSiswa = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);

      const [result] = await pool.execute("DELETE FROM siswa WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Siswa tidak ditemukan" });

      res.json({ message: "Siswa berhasil dihapus" });
    } catch (err) {
      next(err);
    }
  };
}
module.exports = new siswaController();
