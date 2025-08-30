import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import all pages
import Home from "./pages/Home/Home";
import HostelListPage from "./pages/HostelListPage/HostelListPage";
import HostelDetailsPage from "./pages/HostelDetailsPage/HostelDetailsPage";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

// Import shared components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Import the main stylesheet
import './App.css'; 


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/hostels" element={<HostelListPage />} />
            <Route path="/hostels/:hostelId" element={<HostelDetailsPage />} />
            
            {/* Wishlist Page */}
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Authentication Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Fallback Route to redirect any unknown paths to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;