import { FaReact, FaNodeJs, FaRegCopyright } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <footer className="bg-dark text-light mt-auto">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <small>
                <FaRegCopyright className="me-2" />
                2025 Sekolah App
              </small>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <small>
                Dibuat dengan <FaHeart className="text-danger" /> menggunakan
                React
                <FaReact className="ms-1 fs-5" /> & NodeJs
                <FaNodeJs className="ms-1 fs-5" />
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
