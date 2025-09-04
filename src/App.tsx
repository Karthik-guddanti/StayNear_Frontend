
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Import Shared Layout Components
import Navbar from './components/Navbar/Navbar';
// Import All Page Components
import HomePage from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HostelListPage from './pages/HostelListPage/HostelListPage';
import HostelDetailsPage from './pages/HostelDetailsPage/HostelDetailsPage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app-container">
      {/* Navbar is placed here, outside of <Routes>, so it's on every page */}
      <Navbar />

      <main>
        {/* The Routes component will swap the page content here */}
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
          <Route
            path="/hostels/:hostelId"
            element={
              <ProtectedRoute>
                <HostelDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/footer"
            element={
                <Footer />
            }
          />
        </Routes>
      </main>

      {/* You can also add a Footer that will appear on every page */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;