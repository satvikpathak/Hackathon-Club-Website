import React from "react";
import { motion } from "framer-motion";
import image from "./image.png";

const Contact = () => {
  const handleEmailClick = () => {
    const email = "support@example.com"; // Replace with your email address
    const subject = "Contact Us Query";
    const body = "Hello, I would like to inquire Skills...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-1/2 overflow-hidden rounded-t-lg md:rounded-l-lg">
        <img src={image} alt="Contact Illustration" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-40"></div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-90 text-white font-inter p-8 rounded-b-lg md:rounded-r-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Contact Us</h2>
        <p className="text-center text-gray-400 mb-4">Reach out to us for any queries or support!</p>
        <motion.button
          className="px-6 py-3 mb-4 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
          whileHover={{ scale: 1.05 }}
          onClick={handleEmailClick}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Contact;
