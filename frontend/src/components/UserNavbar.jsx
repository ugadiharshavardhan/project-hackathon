import { useNavigate } from "react-router";
import { FaHome, FaRegUser, FaEye, FaBars, FaTimes, FaBookmark, FaClipboardList, FaUser, FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import Cookies from "js-cookie";

function UserNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRefresh = () => {
    navigate("/", { replace: true });
  };

  const handleUserAccount = () => {
    navigate("/user/account", { replace: true });
  };

  const handleProjects = () => {
    navigate("/projects", { replace: true });
  };

  const handleHome = () => {
    navigate("/user/allevents", { replace: true });
  };

  const handleSavedEvents = () => {
    navigate("/user/saved-events", { replace: true });
  };

  const handleAppliedEvents = () => {
    navigate("/user/applied-events", { replace: true });
  };

  const handleUserDetails = () => {
    navigate("/user/details", { replace: true });
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/signin", { replace: true });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-0 z-50 w-full">
      <nav
        className="
          flex justify-between items-center
          px-10 py-5
          bg-white/5 backdrop-blur-md
          border-b border-white/10
          text-white
        "
      >
        {/* LOGO */}
        <div
          onClick={handleRefresh}
          className="
            flex items-center gap-2 cursor-pointer
            text-2xl font-bold
            bg-gradient-to-r from-indigo-400 to-violet-500
            bg-clip-text text-transparent
            hover:from-indigo-500 hover:to-violet-600
            transition-all duration-300
          "
        >
          <span className="text-3xl font-extrabold">&lt;/&gt;</span>
          HackNext
        </div>

        {/* DESKTOP NAV ITEMS */}
        <ul className="hidden md:flex items-center gap-3">
          <NavItem label="Home" icon={<FaHome />} onClick={handleHome} />
          <NavItem label="Projects" icon={<FaEye />} onClick={handleProjects} />
          <NavItem icon={<FaRegUser />} onClick={handleUserAccount} />
        </ul>

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
        <div className="md:hidden bg-white/5 backdrop-blur-md border-b border-white/10">
          <ul className="flex flex-col items-center gap-3 py-5">
            <MobileNavItem label="Home" icon={<FaHome />} onClick={() => { handleHome(); setIsMenuOpen(false); }} />
            <MobileNavItem label="Projects" icon={<FaEye />} onClick={() => { handleProjects(); setIsMenuOpen(false); }} />
            <MobileNavItem label="User Details" icon={<FaUser />} onClick={() => { handleUserDetails(); setIsMenuOpen(false); }} />
            <MobileNavItem label="Saved Events" icon={<FaBookmark />} onClick={() => { handleSavedEvents(); setIsMenuOpen(false); }} />
            <MobileNavItem label="Applied Events" icon={<FaClipboardList />} onClick={() => { handleAppliedEvents(); setIsMenuOpen(false); }} />
            <MobileNavItem label="Logout" icon={<FaSignInAlt />} onClick={() => { handleLogout(); setIsMenuOpen(false); }} />
          </ul>
        </div>
      )}
    </div>
  );
}


function NavItem({ label, icon, onClick }) {
  return (
    <li
      onClick={onClick}
      className="
        flex items-center gap-2 cursor-pointer
        px-4 py-2 rounded-xl
        text-gray-300
        hover:text-white
        hover:bg-white/5
        transition-all duration-300
      "
    >
      {label && <span className="text-sm font-medium">{label}</span>}
      <span className="text-lg">{icon}</span>
    </li>
  );
}

function MobileNavItem({ label, icon, onClick }) {
  return (
    <li
      onClick={onClick}
      className="
        flex items-center gap-2 cursor-pointer
        px-4 py-2 rounded-xl w-full text-center
        text-gray-300
        hover:text-white
        hover:bg-white/5
        transition-all duration-300
      "
    >
      <span className="text-lg">{icon}</span>
      {label && <span className="text-sm font-medium">{label}</span>}
    </li>
  );
}

export default UserNavbar;
