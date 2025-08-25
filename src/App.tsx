import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Hostels from "./pages/Hostels/Hostels";
import Contact from "./pages/Contact/Contact";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
