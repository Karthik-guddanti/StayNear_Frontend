import React from 'react';
import { motion } from 'framer-motion';
import type { HostelCardData } from '@/types';
import './HostelCard.css';

interface HostelCardProps {
  hostel: HostelCardData;
  onSave?: (hostelId: string) => void;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel, onSave }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(hostel.id);
    }
  };

  return (
    <motion.div className="hostel-card-pro">
      <div className="card-image-container">
        <img className="card-image" src={hostel.photo} alt={hostel.name} />
        {onSave && (
          <button className="wishlist-btn" onClick={handleSaveClick} aria-label="Save to wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
            </svg>
          </button>
        )}
      </div>
      <div className="card-info-content">
        <div className="card-header">
          <h3 className="card-title">{hostel.name}</h3>
          <div className="card-rating">
            <span className="star-icon">★</span> {hostel.rating}
          </div>
        </div>
        <p className="card-address">{hostel.distance}</p>
        <p className="card-price">
          <strong>₹{hostel.price.toLocaleString()}</strong> / month
        </p>
      </div>
    </motion.div>
  );
};

export default HostelCard;