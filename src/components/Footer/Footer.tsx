import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} StayNear. All Rights Reserved.
    </footer>
  );
};

export default Footer;