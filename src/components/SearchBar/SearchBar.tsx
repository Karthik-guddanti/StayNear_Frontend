import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      // This URL must exactly match your backend route
      const backendUrl = `http://localhost:5000/api/locations/search?query=${encodeURIComponent(query)}`;
      
      const response = await fetch(backendUrl);
      const data = await response.json();

      if (response.ok && data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        navigate(`/hostels?location=${encodeURIComponent(query)}&lat=${lat}&lng=${lng}`);
      } else {
        setError(data.message || 'Location not found. Please try a different search.');
      }
    } catch (err) {
      setError('Failed to fetch location. Please try again.');
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
          placeholder="Find in and around..."
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