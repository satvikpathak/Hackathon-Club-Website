import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing social media icons from react-icons

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative p-10 bg-[#000000] text-white text-center">
      <svg
        className="absolute left-0 bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#731010" // Set wave color to #731010
          d="M0,128L30,133.3C60,139,120,149,180,165.3C240,181,300,203,360,202.7C420,203,480,181,540,170.7C600,160,660,160,720,170.7C780,181,840,203,900,202.7C960,203,1020,181,1080,170.7C1140,160,1200,160,1260,170.7C1320,181,1380,203,1410,213.3L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"
        ></path>
      </svg>
      <motion.div 
        className="footer-content relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="footer-quotes mb-5"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <pre className="text-lg italic">"Success is not final, failure is not fatal: it is the courage to continue that counts."</pre>
        </motion.div>
        <motion.div 
          className="footer-links flex justify-center space-x-10 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-section">
            <h3 className="font-bold mb-2">Navigation</h3>
            <Link to="/" className="text-white hover:underline transition duration-300 transform hover:scale-105" onClick={scrollToTop}><p>Home</p></Link>
            <Link to="/about" className="text-white hover:underline transition duration-300 transform hover:scale-105" onClick={scrollToTop}><p>About</p></Link>
            <Link to="/contact" className="text-white hover:underline transition duration-300 transform hover:scale-105" onClick={scrollToTop}><p>Contact</p></Link>
          </div>
          <div className="footer-section">
            <h3 className="font-bold mb-2">Legal</h3>
            <p className="hover:underline cursor-pointer transition duration-300 transform hover:scale-105">Terms of Service</p>
            <p className="hover:underline cursor-pointer transition duration-300 transform hover:scale-105">Privacy Policy</p>
          </div>
        </motion.div>
        <motion.div 
          className="footer-social flex justify-center space-x-6 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-110">
            <FaInstagram size={24} />
          </a>
        </motion.div>
        <motion.p 
          className="footer-copyright mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          © 2024 Hackathon Club
        </motion.p>
      </motion.div>
    </footer>
  );
}

export default Footer;
