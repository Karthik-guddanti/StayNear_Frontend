import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import type { Hostel } from '@/types';
import HostelCard from '@/components/HostelCard/HostelCard';
import './WishlistPage.css';

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userInfo) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, [userInfo]);

  const handleRemoveFromWishlist = async (hostelId: string) => {
    if (!userInfo) return;

    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${hostelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
        },
      });

      if (response.ok) {
        // Update the state to remove the hostel from the UI instantly
        setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== hostelId));
      } else {
        throw new Error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
      alert('Could not remove hostel. Please try again.');
    }
  };

  if (loading) {
    return <div className="status-message">Loading your wishlist...</div>;
  }

  return (
    <motion.div
      className="wishlist-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="wishlist-title">Your Saved Hostels</h1>
      {!userInfo ? (
        <p className="empty-wishlist-message">
          Please <Link to="/login">log in</Link> to see your wishlist.
        </p>
      ) : wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map(hostel => (
            <div key={hostel._id} className="wishlist-item">
              <Link to={`/hostels/${hostel._id}`} className="card-link">
                <HostelCard
                  hostel={{
                    id: hostel._id,
                    name: hostel.name,
                    photo: 'https://via.placeholder.com/300x200?text=StayNear',
                    rating: 4.5,
                    reviews: Math.floor(Math.random() * 100),
                    distance: hostel.address,
                    price: hostel.price,
                    amenities: hostel.amenities,
                  }}
                />
              </Link>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromWishlist(hostel._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <img
            src="https://res.cloudinary.com/deakngwen/image/upload/v1756461565/Screenshot_2025-08-29_152731_r81kxl.png"
            alt="Empty Wishlist"
            className="empty-wishlist-image"
          />
          <p className="empty-wishlist-message">Your wishlist is empty!</p>
          <p className="empty-wishlist-subtext">
            Click the heart icon ♡ on any hostel to save it here for later.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default WishlistPage;