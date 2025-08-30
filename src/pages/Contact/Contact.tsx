import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal/Modal';
import PartnerForm from '@/components/PartnerForm/PartnerForm';
import './Contact.css';

const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="contact-page-container">
        <div className="contact-hero">
          <h1>'You've come to the right place, partner'</h1>
        </div>

        <div className="partner-sections">
          <motion.div className="partner-card" whileHover={{ y: -5 }}>
            <img src="https://res.cloudinary.com/deakngwen/image/upload/v1756472884/Screenshot_2025-08-29_183753_rvcvoa.png" alt="Property" />
            <div className="card-body">
              <h2>Your property in the right hands</h2>
              <p>Whether you're the owner of a building, a standalone house, or an under-construction project, we have a plan for it.</p>
              <button onClick={() => setIsModalOpen(true)}>Contact Us</button>
            </div>
          </motion.div>

          <motion.div className="partner-card" whileHover={{ y: -5 }}>
            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80" alt="People" />
            <div className="card-body">
              <h2>Your people in the right care</h2>
              <p>You care for your people, and so do we. From safety to amenities, we’ll leave them wanting for nothing.</p>
              <button onClick={() => setIsModalOpen(true)}>Contact Us</button>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PartnerForm />
      </Modal>
    </>
  );
};

export default Contact;