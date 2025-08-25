import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-600 text-white px-6 py-4 shadow-lg flex justify-between items-center"
    >
      <h1 className="text-xl font-bold">StayNear</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
        <Link to="/hostels" className="hover:text-yellow-300 transition">Hostels</Link>
        <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
