// client/src/components/FilterControls/FilterControls.tsx

import React from 'react';
import './FilterControls.css';
import SearchBar from '../SearchBar/SearchBar';

export interface FilterState {
  sortBy: 'rating'; // 'price' has been removed as a sorting option
  gender: 'all' | 'male' | 'female' | 'colive';
  amenities: string[];
  roomTypes: string[];
}

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: any) => void;
  locationName: string;
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
  
  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const currentRoomTypes = filters.roomTypes || [];
    let newRoomTypes: string[];
    if (checked) {
      newRoomTypes = [...currentRoomTypes, name];
    } else {
      newRoomTypes = currentRoomTypes.filter(type => type !== name);
    }
    onFilterChange('roomTypes', newRoomTypes);
  };

  return (
    <div className="filters-container-pro">
      <div className="filter-section">
        <label htmlFor="search" className="section-label">Location</label>
        <SearchBar initialQuery={locationName} />
      </div>
      
      <h3 className="filters-title">Filters</h3>

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

      <div className="filter-section">
        <label className="section-label">Room Type</label>
        <div className="selection-group">
          {['Private', '4-Bed Dorm', '6-Bed Dorm'].map(roomValue => (
            <div className="custom-checkbox" key={roomValue}>
              <input 
                type="checkbox" 
                id={`room-${roomValue}`} 
                name={roomValue} 
                checked={filters.roomTypes?.includes(roomValue)} 
                onChange={handleRoomTypeChange} 
              />
              <label htmlFor={`room-${roomValue}`}>{roomValue}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;