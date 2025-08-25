import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="about-container"
      >
        <h2>About StayNear</h2>
        <p>
          StayNear is a modern hostel finder platform designed for students. We
          combine location, price, and comfort details to help you choose the
          right place with ease.
        </p>

        <div className="about-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="about-card">
            <h3>📍 Location</h3>
            <p>Find hostels near your university with accurate distance mapping.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="about-card">
            <h3>💰 Affordable</h3>
            <p>Compare hostel prices and amenities to fit your budget perfectly.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="about-card">
            <h3>⭐ Reviews</h3>
            <p>Read reviews from other students and make confident decisions.</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
