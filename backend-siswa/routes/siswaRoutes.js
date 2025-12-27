const express = require("express");
const router = express.Router();

const siswaController = require("../controllers/siswaController");

const {
  validateSiswaCreate,
  validateSiswaUpdate,
} = require("../middlewares/validation");

//public
router.get("/", siswaController.getAllSiswa);
router.get("/total-siswa", siswaController.getTotalSiswa);
router.get("/next-kode", siswaController.nextKodeSiswa);
router.get("/:id", siswaController.getByIdSiswa);
router.post("/", validateSiswaCreate, siswaController.createSiswa);
router.put("/:id", validateSiswaUpdate, siswaController.updateSiswa);
router.delete("/:id", siswaController.deleteSiswa);

module.exports = router;
