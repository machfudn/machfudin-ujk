USE db_sekolah_tes_ojk;

-- SELECT (READ)
SELECT * FROM siswa;

-- UPDATE
UPDATE siswa
SET alamat_siswa = 'Jl. Kenanga No 10'
WHERE kode_siswa = 'S001';

-- DELETE
DELETE FROM siswa
WHERE kode_siswa = 'S001';

-- OPERASI RELASIONAL
SELECT * FROM siswa
WHERE jurusan_siswa = 'Rekayasa Perangkat Lunak';

-- STORED PROCEDURE
DELIMITER $$

CREATE PROCEDURE tambah_siswa (
    IN p_nama VARCHAR(100),
    IN p_alamat TEXT,
    IN p_jk VARCHAR(15),
    IN p_jurusan VARCHAR(100),
    IN p_tgl DATE
)
BEGIN
    INSERT INTO siswa 
    (nama_siswa, alamat_siswa, jenis_kelamin, jurusan_siswa, tgl_siswa)
    VALUES
    (p_nama, p_alamat, p_jk, p_jurusan, p_tgl);
END$$

DELIMITER ;

CALL tambah_siswa(
    'Rina Putri',
    'Jl. Anggrek No 12',
    'Perempuan',
    'Multimedia',
    '2005-01-15'
);

-- FUNCTION
DELIMITER $$

CREATE FUNCTION hitung_jumlah_siswa()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM siswa;
    RETURN total;
END$$

DELIMITER ;

SELECT hitung_jumlah_siswa() AS total_siswa;

DELIMITER $$

CREATE FUNCTION next_kode_siswa()
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
    DECLARE next_number INT;
    SELECT IFNULL(MAX(id), 0) + 1 INTO next_number FROM siswa;
    RETURN CONCAT('S', LPAD(next_number, 3, '0'));
END$$

DELIMITER ;

SELECT next_kode_siswa();

-- TRIGGER
DELIMITER $$

CREATE TRIGGER before_insert_siswa
BEFORE INSERT ON siswa
FOR EACH ROW
BEGIN
    DECLARE next_number INT;

    -- validasi tanggal
    IF NEW.tgl_siswa > CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tanggal siswa tidak boleh lebih dari hari ini';
    END IF;

    -- generate kode siswa
    IF NEW.kode_siswa IS NULL THEN
        SELECT IFNULL(MAX(id), 0) + 1
        INTO next_number
        FROM siswa;

        SET NEW.kode_siswa = CONCAT(
            'S',
            LPAD(next_number, 3, '0')
        );
    END IF;
END$$

DELIMITER ;

-- TRANSACTION
START TRANSACTION;

INSERT INTO siswa 
(nama_siswa, alamat_siswa, jenis_kelamin, jurusan_siswa, tgl_siswa)
VALUES
('Dewi Lestari', 'Jl. Dahlia No 7', 'Perempuan', 'Rekayasa Perangkat Lunak', '2004-08-10');

COMMIT;
ROLLBACK;
