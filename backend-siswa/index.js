const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const siswaRoutes = require("./routes/siswaRoutes");

app.use("/api/siswa", siswaRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API berjalan dengan baik",
    timestamp: new Date().toISOString(),
  });
});

app.use((error, req, res, next) => {
  console.error("ERROR:", error.message);
  res.status(error.status || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`API berjalan pada http://localhost:${port}`);
});
