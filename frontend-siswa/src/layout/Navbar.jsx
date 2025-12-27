import { FaSchool, FaGraduationCap } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <Link
            className="navbar-brand text-white d-flex align-items-center"
            to="/"
          >
            <FaSchool className="me-2" />
            <span>Sekolah App</span>
          </Link>
          <Link
            className="navbar-brand text-white d-flex align-items-center"
            to="/"
          >
            <FaGraduationCap className="me-2" />
            Uji Kompetensi
          </Link>
        </div>
      </nav>
    </div>
  );
}
