const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-6">
      © {new Date().getFullYear()} StayNear. All rights reserved.
    </footer>
  );
};

export default Footer;
