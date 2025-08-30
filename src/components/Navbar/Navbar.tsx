import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/'); // Redirect to home page on logout
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          StayNear
        </Link>

        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/hostels" onClick={closeMobileMenu}>Explore</Link>
          <Link to="/wishlist" className="nav-icon-link" aria-label="Wishlist" onClick={closeMobileMenu}>
            {/* Heart Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
            </svg>
          </Link>

          {userInfo ? (
            // --- Show these links if user IS logged in ---
            <div className="nav-item dropdown">
              <span className="nav-link user-name">Hello, {userInfo.name.split(' ')[0]}</span>
              <div className="dropdown-menu">
                {/* You can add a link to a profile page here later */}
                {/* <Link to="/profile" onClick={closeMobileMenu}>My Profile</Link> */}
                <button onClick={handleLogout} className="dropdown-logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            // --- Show these links if user IS NOT logged in ---
            <div className="nav-auth-links">
              <Link to="/login" className="nav-link-btn login" onClick={closeMobileMenu}>Login</Link>
              <Link to="/register" className="nav-link-btn register" onClick={closeMobileMenu}>Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;