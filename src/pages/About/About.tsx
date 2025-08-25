import { motion } from "framer-motion";
import "./About.css";

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="about-container"
    >
      <h2 className="about-title">About StayNear</h2>
      <p className="about-text">
        StayNear helps students find safe, affordable, and comfortable hostels 
        near their colleges with real reviews, maps, and booking options.
      </p>
    </motion.div>
  );
};

export default AboutPage;
