import { useNavigate } from "react-router";
import { FaBars, FaTimes, FaClipboardList, FaUser, FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import Cookies from "js-cookie";

function AdminNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHome = () => {
    navigate("/", { replace: true });
  };

  const handleUserAppliedEvents = () => {
    navigate("/userappliedevents", { replace: true });
  };

  const handleProfile = () => {
    navigate("/adminaccount", { replace: true });
  };

  const handleLogout = () => {
    Cookies.remove("admin_token");
    navigate("/admin/login", { replace: true });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-0 z-50 w-full">
      <nav
        className="
          flex justify-between items-center
          px-10 py-5
          bg-black border-b border-gray-700
          text-white
        "
      >
        {/* LOGO */}
        <div
          onClick={handleHome}
          className="
            flex items-center gap-2 cursor-pointer
            text-2xl font-bold
            bg-gradient-to-r from-blue-400 to-purple-500
            bg-clip-text text-transparent
            hover:from-blue-500 hover:to-purple-600
            transition-all duration-300
          "
        >
          <span className="text-3xl font-extrabold">&lt;/&gt;</span>
          Admin Panel
        </div>

        {/* DESKTOP NAV ITEMS */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleUserAppliedEvents}
            className="text-white hover:text-gray-300 transition"
          >
            User Applied Events
          </button>
          <button
            onClick={handleProfile}
            className="text-white hover:text-gray-300 transition"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-rose-500/60 hover:bg-rose-500 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <div className="flex flex-col p-4 space-y-2">
            <button
              onClick={() => { handleUserAppliedEvents(); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaClipboardList />
              User Applied Events
            </button>
            <button
              onClick={() => { handleProfile(); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaUser />
              Profile
            </button>
            <button
              onClick={() => { handleLogout(); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaSignInAlt />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNavbar;