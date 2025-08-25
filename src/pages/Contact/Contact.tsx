import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="contact-container"
      >
        <h2>Contact Us</h2>
        <p>
          Have questions or need help? Send us a message and we’ll get back to
          you soon.
        </p>

        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" rows={4}></textarea>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
