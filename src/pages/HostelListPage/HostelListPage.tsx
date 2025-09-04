// client/src/pages/HostelListPage/HostelListPage.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useNearbyHostels from '@/hooks/useNearbyHostels';
import HostelCard from '@/components/HostelCard/HostelCard';
import FilterControls from '@/components/FilterControls/FilterControls';
import type { FilterState } from '@/components/FilterControls/FilterControls';
import './HostelListPage.css';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

const HostelListPage: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({ sortBy: 'rating', gender: 'all', amenities: [], roomTypes: [] });
    const { hostels, loading, error } = useNearbyHostels(); 
    const [searchParams] = useSearchParams();
    const [locationName, setLocationName] = useState('Your Area');

    // This effect handles updating the location name display
    useEffect(() => {
        const location = searchParams.get('location');
        if (location) {
            setLocationName(decodeURIComponent(location));
        } else {
            setLocationName('');
        }
    }, [searchParams]);

    // ✅ NEW: This effect sets the initial filter state from the URL on page load
    useEffect(() => {
        const genderFromUrl = searchParams.get('gender') as FilterState['gender'];
        // Check if the gender from the URL is a valid filter option
        if (genderFromUrl && ['male', 'female', 'colive'].includes(genderFromUrl)) {
            setFilters(prevFilters => ({ ...prevFilters, gender: genderFromUrl }));
        }
    }, []); // The empty [] means this runs only once when the page first loads

    const filteredHostels = useMemo(() => {
        let sortedHostels = [...hostels];

        if (filters.gender !== 'all') {
            sortedHostels = sortedHostels.filter(hostel => hostel.gender === filters.gender);
        }
        if (filters.amenities.length > 0) {
            sortedHostels = sortedHostels.filter(hostel => 
                filters.amenities.every(amenity => (hostel.amenities || []).includes(amenity))
            );
        }
        if (filters.roomTypes.length > 0) {
            sortedHostels = sortedHostels.filter(hostel => 
                filters.roomTypes.some(type => (hostel.roomTypes || []).includes(type))
            );
        }
        
        sortedHostels.sort((a, b) => b.rating - a.rating);

        return sortedHostels;
    }, [hostels, filters]);

    const handleFilterChange = (name: keyof FilterState, value: any) => {
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    if (error) return <div className="status-message error">⚠️ {error}</div>;

    return (
        <div className="explore-layout-no-map">
            <aside className="filter-sidebar">
                <FilterControls 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                  locationName={locationName} 
                />
            </aside>
            <main className="results-panel-full-width">
                <div className="results-header">
                    <h1 className="results-title">Hostels in {locationName || 'your area'}</h1>
                    <p className="results-count">{loading ? 'Searching...' : `${filteredHostels.length} places found`}</p>
                </div>
                {loading ? ( <div className="status-message">🛰️ Finding hostels...</div> ) : (
                    <motion.div className="hostel-grid" variants={containerVariants} initial="hidden" animate="show">
                        {filteredHostels.length > 0 ? (
                        filteredHostels.map((hostel) => (
                            <motion.div key={hostel._id} variants={itemVariants}>
                                <Link to={`/hostel/${hostel._id}`} className="card-link">
                                    <HostelCard
                                        hostel={{
                                            id: hostel._id,
                                            name: hostel.name,
                                            photo: hostel.photoUrl || 'https://via.placeholder.com/300x200?text=No+Image',
                                            rating: hostel.rating,
                                            reviews: hostel.reviews,
                                            distance: hostel.address,
                                            amenities: hostel.amenities || [],
                                        }}
                                    />
                                </Link>
                            </motion.div>
                        ))
                        ) : ( <p className="status-message">No hostels match your current filters.</p> )}
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default HostelListPage;