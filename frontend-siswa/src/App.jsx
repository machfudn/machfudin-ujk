import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUserPlus,
  FaUserPen,
  FaUsers,
  FaPenToSquare,
  FaRegTrashCan,
} from "react-icons/fa6";
import Navbar from "./layout/Navbar.jsx";
import Footer from "./layout/Footer.jsx";

export default function App() {
  const API_URL = "http://localhost:3000/api/siswa"; // variabel/inisiasi endpoint backend
  const [nextKode, setNextKode] = useState(""); // menginisiasi nilai dari nextKode dengan nilai awal string kosong
  const [loading, setLoading] = useState(false); // menginisiasi nilai dari loading dengan nilai awal false
  const [totalSiswa, setTotalSiswa] = useState(0); // menginisiasi nilai dari totalSiswa dengan nilai awal 0
  const [siswa, setSiswa] = useState([]); // menginisiasi nilai dari siswa dengan nilai awal array kosong
  const [form, setForm] = useState({
    kode_siswa: "",
    nama_siswa: "",
    alamat_siswa: "",
    jenis_kelamin: "",
    jurusan_siswa: "",
    tgl_siswa: "",
  }); // menginisiasi nilai dari form dengan nilai awal objek dengan value string kosong dari tiap key property
  const [editId, setEditId] = useState(null); // menginisiasi nilai dari editId dengan nilai awal null

  //API Endpoint

  //mengambil seluruh data siswa
  const getAllSiswa = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setSiswa(res.data);
    } catch (error) {
      console.error("Gagal mengambil data siswa:", error);
    } finally {
      setLoading(false);
    }
  };

  //mengambil total seluruh data siswa
  const getTotalSiswa = async () => {
    try {
      const res = await axios.get(`${API_URL}/total-siswa`);
      setTotalSiswa(res.data.total_siswa);
    } catch (error) {
      console.error("Gagal mengambil total siswa:", error);
    }
  };

  //mengambil next kode untuk kode siswa
  const getNextKodeSiswa = async () => {
    try {
      const res = await axios.get(`${API_URL}/next-kode`);
      setNextKode(res.data.kode_siswa);
    } catch (error) {
      console.error("Gagal mengambil kode siswa:", error);
    }
  };

  //mengirimkan seluruh data pada form ke dalam database
  const createSiswa = async () => {
    setLoading(true);
    try {
      await axios.post(API_URL, form);
    } catch (error) {
      console.error("Gagal menambahkan siswa:", error);
    } finally {
      setLoading(false);
    }
  };

  //mengirimkan/mengupdate seluruh perubahan data pada form ke dalam database
  const updateSiswa = async () => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${editId}`, form);
    } catch (error) {
      console.error("Gagal mengupdate siswa:", error);
    } finally {
      setLoading(false);
    }
  };

  //menghapus data yang terpilih menggunakan parameter id
  const deleteSiswa = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Gagal menghapus siswa:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle
  // melakukan proses penyimpanan dari form kedalam database saat klik tombol update dan simpan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // jika  tombol edit ditekan akan menjalankan
        await updateSiswa(); // fungsi update siswa
        Swal.fire("Berhasil", "Siswa berhasil diupdate", "success"); // notifikasi sweetalert2 success bertulisankan"Berhasil , Siswa berhasil diupdate"
      } else {
        // jika selain tombol edit ditekan akan menjalankan
        await createSiswa(); // fungsi create siswa
        Swal.fire("Berhasil", "Siswa berhasil ditambahkan", "success"); // notifikasi sweetalert2 success bertulisankan"Berhasil , Siswa berhasil ditambahkan"
      }
      // setelah proses diatas dijalankan
      resetForm(); // fungsi reset form
      await getAllSiswa(); // fungsi getAllSiswa untuk mengambil seluruh data siswa
      await getTotalSiswa(); // fungsi getTotalSiswa untuk mengambil total data siswa
      await getNextKodeSiswa(); // fungsi getNextKodeSiswa untuk mengambil kode berikutnya untuk kode siswa
    } catch (err) {
      // jika terdapat error akan menampilkan notifikasi sweetalert2 error bertuliskan "Error, message errornya index pertama/0 jika tidak terdapat di message error akan menampilkan Terjadi Kesalahan"
      Swal.fire(
        "Error",
        err.response?.data?.errors?.[0] || "Terjadi kesalahan",
        "error"
      );
    }
  };

  // untuk menampilkan data yang terpilih ke dalam form dengan parameter s
  const handleEdit = (s) => {
    setEditId(s.id);
    setForm({
      kode_siswa: s.kode_siswa,
      nama_siswa: s.nama_siswa,
      alamat_siswa: s.alamat_siswa,
      jenis_kelamin: s.jenis_kelamin,
      jurusan_siswa: s.jurusan_siswa,
      tgl_siswa: s.tgl_siswa?.slice(0, 10),
    });
  };
  // untuk menampilkan data yang terpilih ke dalam form dengan parameter s
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin hapus?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSiswa(id);
        Swal.fire("Terhapus", "Data berhasil dihapus", "success");
        getAllSiswa();
        getTotalSiswa();
        getNextKodeSiswa();
      }
    });
  };
  // untuk mereset atau membatalkan perubahan pada form saat di klik  tombol batal
  const resetForm = () => {
    setEditId(null);
    setForm({
      kode_siswa: "",
      nama_siswa: "",
      alamat_siswa: "",
      jenis_kelamin: "",
      jurusan_siswa: "",
      tgl_siswa: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllSiswa();
      await getNextKodeSiswa();
      await getTotalSiswa();
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        {/* FORM */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-3">
              {editId ? (
                <>
                  <div className="d-flex align-items-center">
                    <FaUserPen className="me-2 " />
                    Edit Siswa
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <FaUserPlus className="me-2" />
                    Tambah Siswa
                  </div>
                </>
              )}
            </h5>

            <form onSubmit={handleSubmit} className="row g-3">
              {/* Kode Siswa */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="kode_siswa">
                  Kode Siswa
                </label>
                <input
                  type="text"
                  name="kode_siswa"
                  id="kode_siswa"
                  className="form-control bg-light"
                  value={editId ? form.kode_siswa : nextKode}
                  disabled
                />
              </div>

              {/* Nama Siswa */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="nama_siswa">
                  Nama Siswa
                </label>
                <input
                  type="text"
                  name="nama_siswa"
                  id="nama_siswa"
                  className="form-control"
                  placeholder="Masukkan nama siswa"
                  value={form.nama_siswa}
                  onChange={(e) =>
                    setForm({ ...form, nama_siswa: e.target.value })
                  }
                  required
                />
              </div>

              {/* Jenis Kelamin */}
              <div className="col-md-4">
                <label className="form-label" htmlFor="jenis_kelamin">
                  Jenis Kelamin
                </label>
                <select
                  className="form-select"
                  name="jenis_kelamin"
                  id="jenis_kelamin"
                  value={form.jenis_kelamin}
                  onChange={(e) =>
                    setForm({ ...form, jenis_kelamin: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    -- Pilih --
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              {/* Jurusan */}
              <div className="col-md-4">
                <label className="form-label" htmlFor="jurusan">
                  Jurusan
                </label>
                <select
                  className="form-select"
                  id="jurusan"
                  name="jurusan"
                  value={form.jurusan_siswa}
                  onChange={(e) =>
                    setForm({ ...form, jurusan_siswa: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    -- Pilih --
                  </option>
                  <option value="Rekayasa Perangkat Lunak">
                    Rekayasa Perangkat Lunak
                  </option>
                  <option value="Teknik Komputer Jaringan">
                    Teknik Komputer Jaringan
                  </option>
                  <option value="Multimedia">Multimedia</option>
                </select>
              </div>

              {/* Tanggal Lahir */}
              <div className="col-md-4">
                <label className="form-label" htmlFor="tgl_siswa">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tgl_siswa"
                  name="tgl_siswa"
                  className="form-control"
                  value={form.tgl_siswa}
                  onChange={(e) =>
                    setForm({ ...form, tgl_siswa: e.target.value })
                  }
                  required
                />
              </div>

              {/* Alamat */}
              <div className="col-md-12">
                <label className="form-label" htmlFor="alamat">
                  Alamat
                </label>
                <textarea
                  className="form-control"
                  id="alamat"
                  name="alamat"
                  rows="3"
                  placeholder="Masukkan alamat siswa"
                  value={form.alamat_siswa}
                  onChange={(e) =>
                    setForm({ ...form, alamat_siswa: e.target.value })
                  }
                />
              </div>

              {/* Action Button */}
              <div className="col-12 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : editId ? "Update" : "Simpan"}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="card shadow">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                <FaUsers className="text-primary" /> Daftar Siswa
              </h5>
              <div className="mb-0 bg-primary text-white p-2 rounded-3">
                {totalSiswa}
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Jurusan</th>
                    <th>Jenis Kelamin</th>
                    <th>Tanggal Lahir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    siswa.map((s) => (
                      <tr key={s.id}>
                        <td>{s.kode_siswa}</td>
                        <td className="text-capitalize">{s.nama_siswa}</td>
                        <td>{s.alamat_siswa}</td>
                        <td>{s.jurusan_siswa}</td>
                        <td>{s.jenis_kelamin}</td>
                        <td>{s.tgl_siswa?.slice(0, 10)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(s)}
                            disabled={loading}
                          >
                            <FaPenToSquare /> Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(s.id)}
                            disabled={loading}
                          >
                            <FaRegTrashCan className="me-1" />
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}

                  {!loading && !siswa.length && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Data kosong
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
