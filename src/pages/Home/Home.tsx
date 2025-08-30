import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar/SearchBar';
import './Home.css'; // Ensure your CSS file is correctly linked

const Home: React.FC = () => {
  return (
    <div className="home-container-wrapper"> {/* New wrapper for overall page layout */}
      <div className="home-grid">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Spend less time commuting and more hours unwinding.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            Live close to your college or workspace in Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-search"
          >
            <SearchBar />
          </motion.div>
        </div>

        <motion.div
          className="category-cards"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/hostels?type=student" className="category-card student">
            <h3>Modern Student Housing</h3>
            <p>Explore Residences →</p>
          </Link>
          <Link to="/hostels?gender=female" className="category-card female">
            <h3>For Girls</h3>
            <p>Safe & Secure Stays →</p>
          </Link>
          <Link to="/hostels?gender=male" className="category-card male">
            <h3>For Boys</h3>
            <p>Find Your Ideal PG →</p>
          </Link>
        </motion.div>
      </div>

      {/* --- New Sections Added Below the Hero Grid --- */}

      <section className="feature-section left-aligned">
        <div className="feature-images">
          <img src="https://res.cloudinary.com/deakngwen/image/upload/v1756472070/Screenshot_2025-08-29_182415_rlrduz.png" alt="Hostel Exterior" className="main-image"/>
          <img src="https://res.cloudinary.com/deakngwen/image/upload/v1756471620/Screenshot_2025-08-29_181633_rluon2.png" alt="Common Area" className="small-image top-right"/>
          <img src="https://res.cloudinary.com/deakngwen/image/upload/v1756471333/Screenshot_2025-08-29_180947_rmvxql.png" alt="Corridor" className="small-image bottom-left"/>
        </div>
        <div className="feature-content">
          <h2>Start living your best life from day one</h2>
          <p>
            Bring a box full of hopes, dreams, ambitions... and of course, your personal belongings.
            Everything else - furniture, appliances, food - has already been taken care of by StayNear.
            We ensure a seamless move-in experience so you can focus on what matters.
          </p>
        </div>
      </section>

      <section className="feature-section right-aligned">
        <div className="feature-content">
          <h2>Step into a room that has room for everything</h2>
          <p>
            Your clothes and bag will not be fighting for space on the same chair. At StayNear, there's ample room for all your possessions.
            Even a framed photo of your family, for the rare occasions you miss home.
            Our rooms are designed for comfort, privacy, and productivity.
          </p>
        </div>
        <div className="feature-images">
          <img src="https://res.cloudinary.com/deakngwen/image/upload/v1756472314/Screenshot_2025-08-29_182818_hwwqds.png" alt="Hostel Room" className="main-image"/>
        </div>
      </section>

      {/* Optional: Add a call to action section */}
      <section className="cta-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to find your perfect stay?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/hostels" className="cta-button">
            Explore Hostels Now
          </Link>
        </motion.div>
      </section>

    </div> // End of home-container-wrapper
  );
};

export default Home;