import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Hostel } from '@/types';
import { useAuth } from '@/context/AuthContext';
import useNearbyHostels from '@/hooks/useNearbyHostels';
import HostelCard from '@/components/HostelCard/HostelCard';
import Map from '@/components/Map/Map';
import FilterControls from '@/components/FilterControls/FilterControls';
import type { FilterState } from '@/components/FilterControls/FilterControls';
import './HostelListPage.css';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

const HostelListPage: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        price: 15000,
        sortBy: 'rating',
        gender: 'all',
        amenities: [],
    });

    const [isMapVisible, setIsMapVisible] = useState<boolean>(true);
    const { hostels, loading, error } = useNearbyHostels(filters);
    const { userInfo } = useAuth();
    const [searchParams] = useSearchParams();
    const [locationName, setLocationName] = useState('Your Area');

    useEffect(() => {
        const location = searchParams.get('location');
        if (location) {
            setLocationName(decodeURIComponent(location));
        }
    }, [searchParams]);

    const handleFilterChange = (name: keyof FilterState, value: any) => {
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleSaveHostel = async (hostelId: string) => {
        if (!userInfo) {
            alert('Please log in to save hostels to your wishlist.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({ hostelId }),
            });

            if (!response.ok) {
                throw new Error('Failed to save to wishlist');
            }
            alert('Hostel added to your wishlist!');
        } catch (error) {
            alert('Could not save hostel. Please try again.');
        }
    };

    if (error) return <div className="status-message error">⚠️ {error}</div>;

    return (
        <>
            <div className={`explore-layout ${isMapVisible ? 'map-visible' : ''}`}>
                <aside className="filter-sidebar">
                    <FilterControls filters={filters} onFilterChange={handleFilterChange} />
                </aside>

                <main className="results-panel">
                    <div className="results-header">
                        <h1 className="results-title">Hostels in {locationName}</h1>
                        <p className="results-count">
                            {loading ? 'Searching...' : `${hostels.length} places found`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="status-message">🛰️ Finding hostels...</div>
                    ) : (
                        <motion.div className="hostel-grid" variants={containerVariants} initial="hidden" animate="show">
                            {hostels.length > 0 ? (
                            hostels.map((hostel: Hostel) => (
                                <motion.div key={hostel._id} variants={itemVariants}>
                                    <Link to={`/hostels/${hostel._id}`} className="card-link">
                                        <HostelCard
                                            hostel={{
                                                id: hostel._id,
                                                name: hostel.name,
                                                photo: hostel.photoUrl || 'https://via.placeholder.com/300x200?text=No+Image',
                                                rating: hostel.rating,
                                                reviews: hostel.reviews,
                                                distance: hostel.address,
                                                price: hostel.price,
                                                amenities: hostel.amenities || [],
                                            }}
                                            onSave={handleSaveHostel}
                                        />
                                    </Link>
                                </motion.div>
                            ))
                            ) : (
                            <p className="status-message">No hostels match your current filters.</p>
                            )}
                        </motion.div>
                    )}
                </main>

                <section className="map-panel">
                    <Map hostels={hostels} />
                </section>
            </div>

            <button className="map-toggle-btn" onClick={() => setIsMapVisible(!isMapVisible)}>
                {isMapVisible ? 'Hide Map' : 'Show Map'}
            </button>
        </>
    );
};

export default HostelListPage;