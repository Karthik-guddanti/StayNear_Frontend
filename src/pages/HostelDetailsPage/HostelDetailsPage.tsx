import React from 'react';
import { useParams } from 'react-router-dom';
import useHostelDetails from '@/hooks/useHostelDetails'; // Use the new hook
import Map from '@/components/Map/Map';
import './HostelDetailsPage.css';

const HostelDetailsPage: React.FC = () => {
  const { hostelId } = useParams<{ hostelId: string }>();
  const { hostel, loading, error } = useHostelDetails(hostelId);

  if (loading) return <div className="status-message">Loading Hostel Details...</div>;
  if (error) return <div className="status-message error">{error}</div>;
  if (!hostel) return <div className="status-message">Hostel not found.</div>;

  return (
    <div className="details-page-container">
      <div className="gallery">
        <img src="https://via.placeholder.com/600x400?text=StayNear+Hostel" alt="Main view" className="gallery-main" />
        <img src="https://via.placeholder.com/300x200?text=Room" alt="Secondary view 1" className="gallery-thumb" />
        <img src="https://via.placeholder.com/300x200?text=Common+Area" alt="Secondary view 2" className="gallery-thumb" />
      </div>

      <div className="details-layout">
        <div className="details-info">
          <h1 className="details-title">{hostel.name}</h1>
          <p className="details-address">{hostel.address}</p>
          <div className="reviews-section">
            <h2 className="section-title">Details</h2>
            <p>Contact Phone: {hostel.phone}</p>
          </div>
        </div>
        
        <div className="details-sidebar">
          <div className="contact-box">
            <h3>Interested? Contact Owner</h3>
            <a href={`tel:${hostel.phone}`} className="contact-link">
              <button className="contact-button">📞 Call Now</button>
            </a>
          </div>
          <div className="details-map">
            <Map hostels={[hostel]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsPage;