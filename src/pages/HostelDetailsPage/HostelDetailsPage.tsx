// client/src/pages/HostelDetailsPage/HostelDetailsPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
// FIX 1: Corrected the import path and name
import useHostelDetails from '@/hooks/useHostelDetails'; 
import './HostelDetailsPage.css';

const HostelDetailsPage: React.FC = () => {
  const { hostelId } = useParams<{ hostelId: string }>();
  // FIX 2: Correctly call the hook (it was named 'HostelDetails' before)
  const { place: hostel, loading, error } = useHostelDetails(hostelId); 

  if (loading) {
    return <div className="status-message">Loading Hostel Details...</div>;
  }
  if (error || !hostel) {
    return <div className="status-message error">⚠️ Could not load hostel details.</div>;
  }

  // The rest of your component code remains the same...
  return (
    <div className="details-page-container">
      {/* ...your JSX for displaying hostel details... */}
    </div>
  );
};

export default HostelDetailsPage;