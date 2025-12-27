module.exports = {
  // VALIDASI CREATE SISWA
  validateSiswaCreate: (req, res, next) => {
    const {
      nama_siswa,
      alamat_siswa,
      jenis_kelamin,
      jurusan_siswa,
      tgl_siswa,
    } = req.body;

    const errors = [];

    // nama_siswa
    if (
      !nama_siswa ||
      typeof nama_siswa !== "string" ||
      nama_siswa.trim().length < 2
    ) {
      errors.push("nama_siswa wajib diisi (minimal 2 karakter)");
    }

    // alamat_siswa
    if (
      !alamat_siswa ||
      typeof alamat_siswa !== "string" ||
      alamat_siswa.trim().length < 5
    ) {
      errors.push("alamat_siswa wajib diisi (minimal 5 karakter)");
    }

    // jenis_kelamin
    if (!jenis_kelamin || !["Laki-laki", "Perempuan"].includes(jenis_kelamin)) {
      errors.push("jenis_kelamin harus 'Laki-laki' atau 'Perempuan'");
    }

    // jurusan_siswa
    if (
      !jurusan_siswa ||
      typeof jurusan_siswa !== "string" ||
      jurusan_siswa.trim().length < 2
    ) {
      errors.push("jurusan_siswa wajib diisi");
    }

    // tgl_siswa
    if (!tgl_siswa || isNaN(Date.parse(tgl_siswa))) {
      errors.push("tgl_siswa wajib diisi dan format harus valid (YYYY-MM-DD)");
    } else if (new Date(tgl_siswa) > new Date()) {
      errors.push("tgl_siswa tidak boleh lebih dari hari ini");
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    next();
  },

  // VALIDASI UPDATE SISWA
  validateSiswaUpdate: (req, res, next) => {
    const {
      nama_siswa,
      alamat_siswa,
      jenis_kelamin,
      jurusan_siswa,
      tgl_siswa,
    } = req.body;

    const errors = [];

    // hanya validasi jika field dikirim
    if (
      nama_siswa !== undefined &&
      (typeof nama_siswa !== "string" || nama_siswa.trim().length < 2)
    ) {
      errors.push("Jika diisi, nama_siswa minimal 2 karakter");
    }

    if (
      alamat_siswa !== undefined &&
      (typeof alamat_siswa !== "string" || alamat_siswa.trim().length < 5)
    ) {
      errors.push("Jika diisi, alamat_siswa minimal 5 karakter");
    }

    if (
      jenis_kelamin !== undefined &&
      !["Laki-laki", "Perempuan"].includes(jenis_kelamin)
    ) {
      errors.push("jenis_kelamin harus 'Laki-laki' atau 'Perempuan'");
    }

    if (
      jurusan_siswa !== undefined &&
      (typeof jurusan_siswa !== "string" || jurusan_siswa.trim().length < 2)
    ) {
      errors.push("Jika diisi, jurusan_siswa wajib valid");
    }

    if (tgl_siswa !== undefined) {
      if (isNaN(Date.parse(tgl_siswa))) {
        errors.push("tgl_siswa harus format valid (YYYY-MM-DD)");
      } else if (new Date(tgl_siswa) > new Date()) {
        errors.push("tgl_siswa tidak boleh lebih dari hari ini");
      }
    }

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    next();
  },
};
