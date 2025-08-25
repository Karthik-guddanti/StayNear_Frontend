import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HostelListPage from './pages/HostelListPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/hostels" element={<HostelListPage />} />
                {/* Add more routes here as your project grows */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;