import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const storyBlocks = [
  {
    title: "You needed a place like home,",
    highlight: "so we moved back home",
    text: "It was 2015. Two erstwhile IIM-A hostel roomies, Anindya and Sandeep, met again. Reminiscing about the 'good old hostel days', they realised a lot of that 'good' could've been better. So to give youngsters that 'better', in 2017, they set up a base in New Delhi, and the rest, as we say, is the present.",
    image: "https://res.cloudinary.com/deakngwen/image/upload/v1756472535/Screenshot_2025-08-29_183202_kxqqzj.png",
    reverse: false,
  },
  {
    title: "We didn't find it for us,",
    highlight: "so we created it for you",
    text: "That's essentially our story in one sentence. Crammed up hostels or cooped up PGs – not much of a choice, is it? That’s why we created StayNear – a place designed by people who've been in your shoes. Understand you. And are inspired by you.",
    image: "https://res.cloudinary.com/deakngwen/image/upload/v1756472692/Screenshot_2025-08-29_183437_bk4mtr.png",
    reverse: true,
  },
];

const milestones = [
  {
    title: 'StayNear Launches in Hyderabad to Simplify Student Housing',
    source: 'Our Blog',
    date: 'August 29, 2025',
    excerpt: 'StayNear officially launches its platform, offering a curated list of verified hostels and PGs, starting with the tech hub of Hyderabad.',
    imageUrl: 'https://res.cloudinary.com/deakngwen/image/upload/v1756472815/Screenshot_2025-08-29_183641_u2okdo.png',
    size: 'large',
  },
  {
    title: 'Securing Student Safety: Our Top Priority',
    source: 'Press Release',
    date: 'September 15, 2025',
    excerpt: 'We are introducing a multi-step verification process for all listed properties to ensure the highest standards of safety and comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    title: 'New Filtering Options Go Live',
    source: 'Product Update',
    date: 'October 05, 2025',
    excerpt: 'Users can now filter hostels by gender, price, and rating, making the search for the perfect stay faster and more efficient than ever.',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    title: 'Partnering with Local Hostels for a Better Tomorrow',
    source: 'Community News',
    date: 'October 20, 2025',
    excerpt: 'StayNear is proud to announce partnerships with over 50 local property owners, fostering community growth and providing more choices for students.',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    size: 'full',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About: React.FC = () => {
  return (
    <motion.div 
      className="about-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="about-hero">
        <h1 className="about-hero-title">Our Story & Mission</h1>
        <p className="about-hero-subtitle">
          We started StayNear with a simple goal: to make finding a safe, comfortable, and affordable place to live easier for students across India.
          Follow our journey as we build a trusted community for student housing.
        </p>
      </div>

      {/* Story Sections */}
      {storyBlocks.map((block, index) => (
        <div 
          key={index} 
          className={`story-block ${block.reverse ? 'reverse' : ''}`}
        >
          <img src={block.image} alt={block.title} className="story-image" />
          <div className="story-text">
            <h2>
              {block.title} <span>{block.highlight}</span>
            </h2>
            <p>{block.text}</p>
          </div>
        </div>
      ))}

      {/* Milestones Section */}
      <motion.div 
        className="milestones-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {milestones.map((item) => (
          <motion.a 
            key={item.title} 
            href="#" 
            className={`milestone-card card-${item.size}`} 
            variants={itemVariants}
          >
            <img src={item.imageUrl} alt={item.title} className="card-bg-image" />
            <div className="card-overlay"></div>
            <div className="card-content">
              <p className="card-meta">{item.source} • {item.date}</p>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-excerpt">{item.excerpt}</p>
              <span className="card-read-more">Read More →</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
