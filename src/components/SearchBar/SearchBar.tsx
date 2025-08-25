import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT THIS HOOK
import axios from 'axios';

// Define the type for a Location object and a Geolocation coordinate object
interface Location {
    id: number;
    name: string;
    type: string;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initialize the useNavigate hook
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 2) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get<Location[]>(
                        `http://localhost:5000/api/locations/search?query=${query}`
                    );
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching search suggestions:', error);
                }
            };

            const delayDebounceFn = setTimeout(() => {
                fetchSuggestions();
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    // New navigation logic when a location is clicked
    const handleLocationClick = (locationName: string) => {
        setQuery(locationName);
        setSuggestions([]);
        // Navigate to the hostel list page, passing the location name as a URL parameter
        navigate(`/hostels?location=${locationName}`);
    };

    const handleCurrentLocationClick = () => {
        setIsLoading(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords: Coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setIsLoading(false);
                    console.log('Current location coordinates:', coords);
                    
                    // Navigate to the hostel list page, passing the coordinates as URL parameters
                    navigate(`/hostels?lat=${coords.latitude}&lon=${coords.longitude}`);
                },
                (error) => {
                    setIsLoading(false);
                    console.error('Error getting current location:', error);
                    alert(`Could not get your location. Please type a location instead.`);
                }
            );
        } else {
            setIsLoading(false);
            alert('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Enter an area, locality, or landmark"
                value={query}
                onChange={handleInputChange}
            />
            <button onClick={handleCurrentLocationClick} disabled={isLoading}>
                {isLoading ? 'Getting Location...' : 'Use my current location'}
            </button>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((location) => (
                        <li key={location.id} onClick={() => handleLocationClick(location.name)}>
                            {location.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;