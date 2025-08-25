import { motion } from "framer-motion";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="contact-container"
    >
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-text">📧 Email: support@staynear.com</p>
      <p className="contact-text">📞 Phone: +91 98765 43210</p>
    </motion.div>
  );
};

export default ContactPage;
