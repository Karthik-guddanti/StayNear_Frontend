import React, { useState, useEffect, useMemo } from 'react'; // ✅ Import useMemo
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Hostel } from '@/types';
import useNearbyHostels from '@/hooks/useNearbyHostels';
import HostelCard from '@/components/HostelCard/HostelCard';
import Map from '@/components/Map/Map';
import FilterControls from '@/components/FilterControls/FilterControls';
import type { FilterState } from '@/components/FilterControls/FilterControls';
import './HostelListPage.css';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

const HostelListPage: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({ sortBy: 'rating', gender: 'all', amenities: [] });
    
    // ✅ This hook now returns ALL hostels from the API
    const { hostels, loading, error } = useNearbyHostels(); 
    
    const [searchParams] = useSearchParams();
    const [locationName, setLocationName] = useState('Your Area');

    useEffect(() => {
        const location = searchParams.get('location');
        if (location) {
            setLocationName(decodeURIComponent(location));
        } else {
            setLocationName('');
        }
    }, [searchParams]);

    // ✅ NEW: This is where we perform filtering on the client-side
    const filteredHostels = useMemo(() => {
        let sortedHostels = [...hostels];

        // 1. Filter by Gender
        if (filters.gender !== 'all') {
            sortedHostels = sortedHostels.filter(hostel => hostel.gender === filters.gender);
        }

        // 2. Filter by Amenities
        if (filters.amenities.length > 0) {
            sortedHostels = sortedHostels.filter(hostel => 
                filters.amenities.every(amenity => hostel.amenities.includes(amenity))
            );
        }

        // 3. Sort Results
        if (filters.sortBy === 'price') {
            sortedHostels.sort((a, b) => a.price - b.price);
        } else { // Default to sorting by rating
            sortedHostels.sort((a, b) => b.rating - a.rating);
        }

        return sortedHostels;
    }, [hostels, filters]); // This logic re-runs whenever the hostels or filters change

    const handleFilterChange = (name: keyof FilterState, value: any) => {
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    if (error) return <div className="status-message error">⚠️ {error}</div>;

    return (
        <div className="explore-layout map-visible">
            <aside className="filter-sidebar">
                <FilterControls 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                  locationName={locationName} 
                />
            </aside>

            <main className="results-panel">
                <div className="results-header">
                    <h1 className="results-title">Hostels in {locationName || 'your area'}</h1>
                    {/* ✅ FIX: Count based on the filtered list */}
                    <p className="results-count">{loading ? 'Searching...' : `${filteredHostels.length} places found`}</p>
                </div>

                {loading ? ( <div className="status-message">🛰️ Finding hostels...</div> ) : (
                    <motion.div className="hostel-grid" variants={containerVariants} initial="hidden" animate="show">
                        {/* ✅ FIX: Map over the filtered list */}
                        {filteredHostels.length > 0 ? (
                        filteredHostels.map((hostel: Hostel) => (
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
                                    />
                                </Link>
                            </motion.div>
                        ))
                        ) : ( <p className="status-message">No hostels match your current filters.</p> )}
                    </motion.div>
                )}
            </main>

            <section className="map-panel">
                {/* ✅ FIX: Pass the filtered list to the map */}
                <Map hostels={filteredHostels} />
            </section>
        </div>
    );
};

export default HostelListPage;