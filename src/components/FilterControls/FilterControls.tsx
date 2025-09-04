// client/src/components/FilterControls/FilterControls.tsx

import React from 'react';
import './FilterControls.css';
import SearchBar from '../SearchBar/SearchBar'; // ✅ NEW: Import SearchBar

// ✅ FIX: Remove 'price' from the FilterState interface
export interface FilterState {
  sortBy: 'rating' | 'price';
  gender: 'all' | 'male' | 'female' | 'colive';
  amenities: string[];
}

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: any) => void;
  locationName: string; // ✅ NEW: Prop to pass the current location to the SearchBar
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, locationName }) => {
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const currentAmenities = filters.amenities || [];
    let newAmenities: string[];
    if (checked) {
      newAmenities = [...currentAmenities, name];
    } else {
      newAmenities = currentAmenities.filter(amenity => amenity !== name);
    }
    onFilterChange('amenities', newAmenities);
  };

  return (
    <div className="filters-container-pro">
      {/* ✅ NEW: Add the SearchBar component at the top of the filters */}
      <div className="filter-section">
        <label htmlFor="search" className="section-label">Location</label>
        <SearchBar initialQuery={locationName} />
      </div>
      
      <h3 className="filters-title">Filters</h3>

      {/* ✅ REMOVED: The entire price filter section has been deleted. */}

      <div className="filter-section">
        <label className="section-label">Gender</label>
        <div className="selection-group">
          {['all', 'male', 'female', 'colive'].map(genderValue => (
            <div className="custom-radio" key={genderValue}>
              <input 
                type="radio" 
                id={`gender-${genderValue}`} 
                name="gender" 
                value={genderValue} 
                checked={filters.gender === genderValue} 
                onChange={(e) => onFilterChange('gender', e.target.value as FilterState['gender'])} 
              />
              <label htmlFor={`gender-${genderValue}`}>{genderValue.charAt(0).toUpperCase() + genderValue.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="section-label">Amenities</label>
        <div className="selection-group">
          {['AC', 'Laundry', 'Gym'].map(amenityValue => (
            <div className="custom-checkbox" key={amenityValue}>
              <input 
                type="checkbox" 
                id={`amenity-${amenityValue}`} 
                name={amenityValue} 
                checked={filters.amenities?.includes(amenityValue)} 
                onChange={handleAmenityChange} 
              />
              <label htmlFor={`amenity-${amenityValue}`}>{amenityValue === 'AC' ? 'Air Conditioning' : amenityValue}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;