import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from "js-cookie";
import { useNavigate, useLocation } from 'react-router';
import { 
  FaSignInAlt, 
  FaAngleDoubleRight, 
  FaRegUser, 
  FaEye,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';
import Button from './ui/Button';

const NavLink = ({ to, icon: Icon, label, onClick, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.li 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary-100 text-primary-700' 
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
      } ${isMobile ? 'w-full' : ''}`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </motion.li>
  );
};

function UserNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/signin", { replace: true });
  };

  const handleRefresh = () => {
    navigate("/user", { replace: true });
    setIsOpen(false);
  };

  const handleAppliedEventsByUser = () => {
    navigate("/user/appliedevents", { replace: true });
    setIsOpen(false);
  };

  const handleUserAccount = () => {
    navigate("/user/account", { replace: true });
    setIsOpen(false);
  };

  const handleProjects = () => {
    navigate("/projects", { replace: true });
    setIsOpen(false);
  };

  const navItems = [
    { to: "/user", label: "Home", icon: FaHome, onClick: handleRefresh },
    { to: "/projects", label: "Projects", icon: FaEye, onClick: handleProjects },
    { to: "/user/appliedevents", label: "Applied Events", icon: FaAngleDoubleRight, onClick: handleAppliedEventsByUser },
    { to: "/user/account", label: "My Account", icon: FaRegUser, onClick: handleUserAccount },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            onClick={handleRefresh}
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              &lt;/&gt; HackNext
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.to} {...item} />
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => (
                <div key={item.to} className="px-2 py-1">
                  <NavLink {...item} isMobile />
                </div>
              ))}
              <div className="px-2 py-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth
                  className="justify-center mt-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
  )
}

export default UserNavbar;
