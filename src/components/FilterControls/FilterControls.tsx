import React from 'react';
import './FilterControls.css';

export interface FilterState {
  price: number;
  sortBy: 'rating' | 'price';
  gender: 'all' | 'male' | 'female' | 'colive';
  amenities: string[];
}

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (name: keyof FilterState, value: any) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange }) => {
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // Safely get current amenities, defaulting to an empty array if undefined
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
      <h3 className="filters-title">Filters</h3>
      <div className="filter-section">
        <label htmlFor="price" className="section-label">Max Price: ₹{filters.price.toLocaleString()}/month</label>
        <input type="range" id="price" name="price" min="5000" max="15000" step="500" value={filters.price} onChange={(e) => onFilterChange('price', parseInt(e.target.value, 10))} />
      </div>
      <div className="filter-section">
        <label className="section-label">Gender</label>
        <div className="selection-group">
          {['all', 'male', 'female', 'colive'].map(genderValue => (
            <div className="custom-radio" key={genderValue}>
              <input type="radio" id={`gender-${genderValue}`} name="gender" value={genderValue} checked={filters.gender === genderValue} onChange={(e) => onFilterChange('gender', e.target.value)} />
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
              <input type="checkbox" id={`amenity-${amenityValue}`} name={amenityValue} checked={filters.amenities?.includes(amenityValue)} onChange={handleAmenityChange} />
              <label htmlFor={`amenity-${amenityValue}`}>{amenityValue === 'AC' ? 'Air Conditioning' : amenityValue}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;