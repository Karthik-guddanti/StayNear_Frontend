import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="home-container"
      >
        <h1 className="home-title">
          Find Your Perfect <span>Hostel</span>
        </h1>
        <p className="home-subtitle">
          StayNear helps students discover and book the best hostels near their
          college with accurate details, pricing, and reviews.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="home-button"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;
