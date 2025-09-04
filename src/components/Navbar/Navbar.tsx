// client/src/components/Navbar/Navbar.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsKnowMoreOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
    navigate('/');
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        {/* ✅ FIX: Add the logo image next to the name */}
        <Link to="/" className="nav-logo" onClick={closeAllMenus}>
          <img 
            src="https://res.cloudinary.com/deakngwen/image/upload/v1756473241/Screenshot_2025-08-29_184307_wbk9tt.png" 
            alt="StayNear Logo" 
            className="logo-image" 
          />
          StayNear
        </Link>

        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span /><span /><span />
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/hostels" onClick={closeAllMenus}>Explore</Link>
          <div className={`nav-item dropdown ${isKnowMoreOpen ? 'active' : ''}`}>
            <button className="dropdown-toggle" onClick={() => setIsKnowMoreOpen(!isKnowMoreOpen)}>
              Know More
            </button>
            <div className="dropdown-menu">
              <Link to="/about" onClick={closeAllMenus}>About Us</Link>
              <Link to="/contact" onClick={closeAllMenus}>Contact Us</Link>
            </div>
          </div>
          
          {userInfo ? (
            <div className={`nav-item dropdown ${isUserMenuOpen ? 'active' : ''}`}>
              <button className="dropdown-toggle user-name" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                Hello, {userInfo.name.split(' ')[0]}
              </button>
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="dropdown-logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link to="/login" className="nav-link-btn login" onClick={closeAllMenus}>Login</Link>
              <Link to="/register" className="nav-link-btn register" onClick={closeAllMenus}>Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;