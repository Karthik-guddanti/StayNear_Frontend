
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchLocation } from '@/services/api';
import './SearchBar.css';

interface SearchBarProps {
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (error) setError(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchLocation(query);
      const data = response.data; 

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        navigate(`/hostels?location=${encodeURIComponent(query)}&lat=${lat}&lng=${lng}`);
      } else {
        setError(data.message || 'Location not found.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocationClick = () => {
    navigate('/hostels');
  };

  return (
    <div className="search-bar-wrapper">
      <form className="search-form-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a new location..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <button
          type="button"
          onClick={handleCurrentLocationClick}
          className="location-icon-btn"
          aria-label="Use current location"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM20.94 11C20.48 6.83 17.17 3.52 13 3.06V1H11V3.06C6.83 3.52 3.52 6.83 3.06 11H1V13H3.06C3.52 17.17 6.83 20.48 11 20.94V23H13V20.94C17.17 20.48 20.48 17.17 20.94 13H23V11H20.94ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z" fill="#6B7280"/>
          </svg>
        </button>
        <button type="submit" className="search-btn" disabled={isLoading}>
          {isLoading ? '...' : 'Search'}
        </button>
      </form>
      {error && <p className="search-error">{error}</p>}
    </div>
  );
};

export default SearchBar;