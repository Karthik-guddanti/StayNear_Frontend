// client/src/pages/HostelDetailsPage/HostelDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHostelById } from '@/services/api';
import type { Hostel } from '@/types';
import './HostelDetailsPage.css';

const HostelDetailsPage: React.FC = () => {
    const { hostelId } = useParams<{ hostelId: string }>();
    const [hostel, setHostel] = useState<Hostel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!hostelId) return;
        const fetchHostel = async () => {
            try {
                setLoading(true);
                const response = await getHostelById(hostelId);
                setHostel(response.data);
            } catch (err) {
                setError('Failed to fetch hostel details.');
            } finally {
                setLoading(false);
            }
        };
        fetchHostel();
    }, [hostelId]);

    const handleGetDirections = () => {
        if (!hostel) return;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hostel.address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    if (loading) return <div className="status-message">Loading details...</div>;
    if (error) return <div className="status-message error">⚠️ {error}</div>;
    if (!hostel) return <div className="status-message">Hostel not found.</div>;

    return (
        <div className="details-page-container">
            <div className="details-header">
                <img src={hostel.photoUrl || 'https://via.placeholder.com/1200x400?text=Hostel+Image'} alt={hostel.name} className="details-main-image" />
                <div className="details-header-content">
                    <h1 className="details-title">{hostel.name}</h1>
                    <p className="details-address">{hostel.address}</p>
                    <div className="details-rating">★ {hostel.rating} ({hostel.reviews} reviews)</div>
                </div>
            </div>

            <div className="details-body">
                <div className="details-info">
                    <h2>About this place</h2>
                    
                    {/* ❌ REMOVED: Price paragraph is gone */}

                    <p><strong>Gender:</strong> {hostel.gender.charAt(0).toUpperCase() + hostel.gender.slice(1)}</p>
                    
                    <h3>Room Types</h3>
                    <ul className="amenities-list">
                        {(hostel.roomTypes || []).map(type => <li key={type}>{type}</li>)}
                    </ul>

                    <h3>Amenities</h3>
                    <ul className="amenities-list">
                        {(hostel.amenities || []).map(amenity => <li key={amenity}>{amenity}</li>)}
                    </ul>
                </div>

                {/* ✅ FIX: This section is updated to show contact info */}
                <div className="details-actions">
                    <h2>Location & Contact</h2>
                    <div className="contact-item">
                      <span className="contact-icon">📍</span>
                      <p>{hostel.address}</p>
                    </div>
                    {hostel.phone && hostel.phone !== "N/A" && (
                      <div className="contact-item">
                        <span className="contact-icon">📞</span>
                        <a href={`tel:${hostel.phone}`}>{hostel.phone}</a>
                      </div>
                    )}
                    {hostel.website && hostel.website !== "N/A" && (
                      <div className="contact-item">
                        <span className="contact-icon">🌐</span>
                        <a href={hostel.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
                      </div>
                    )}
                    <button onClick={handleGetDirections} className="directions-button">
                        Get Directions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HostelDetailsPage;