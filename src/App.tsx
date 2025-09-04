import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Import Shared Layout Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import All Page Components
import HomePage from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HostelListPage from './pages/HostelListPage/HostelListPage';
// ✅ NEW: Import the new HostelDetailsPage component
import HostelDetailsPage from './pages/HostelDetailsPage/HostelDetailsPage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* --- Protected Routes --- */}
          <Route
            path="/hostels"
            element={
              <ProtectedRoute>
                <HostelListPage />
              </ProtectedRoute>
            }
          />
          {/* ✅ NEW: Add the route for the single hostel details page */}
          <Route
            path="/hostel/:hostelId"
            element={
              <ProtectedRoute>
                <HostelDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;