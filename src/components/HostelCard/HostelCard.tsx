// client/src/components/HostelCard/HostelCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { HostelCardData } from '@/types';
import './HostelCard.css';

interface HostelCardProps {
  hostel: HostelCardData;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel }) => {
  return (
    <motion.div className="hostel-card-pro">
      <div className="card-image-container">
        <img className="card-image" src={hostel.photo} alt={hostel.name} />
      </div>
      <div className="card-info-content">
        <div className="card-header">
          <h3 className="card-title">{hostel.name}</h3>
          <div className="card-rating">
            <span className="star-icon">★</span> {hostel.rating}
          </div>
        </div>
        <p className="card-address">{hostel.distance}</p>
        
        {/* ❌ REMOVED: The entire price paragraph is deleted from here */}
        
      </div>
    </motion.div>
  );
};

export default HostelCard;