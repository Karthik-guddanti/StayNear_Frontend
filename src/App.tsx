import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HostelListPage from "./pages/HostelListPage/HostelListPage";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/hostels" element={<HostelListPage />} />
                {/* Add more routes here as your project grows */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;