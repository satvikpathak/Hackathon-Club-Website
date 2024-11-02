import React from "react";
import { motion } from "framer-motion";
import teamImage from "./teamImage.jpg"; // Replace with your team or mission image
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Left side with image */}
      <div className="relative w-full md:w-1/2 overflow-hidden rounded-t-lg md:rounded-l-lg">
        <img
          src={teamImage}
          alt="Our Team"
          className=" w-full h-full object-cover "
        />
        {/* Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-40"></div>
      </div>

      {/* Right side with content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-black bg-opacity-90 text-white font-inter p-8 rounded-b-lg md:rounded-r-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">About Us</h2>
        <p className="text-center text-gray-400 mb-4">
          Empowering Innovation Through Hackathons
        </p>
        <p className="text-gray-300 text-lg mb-4 leading-relaxed">
          Our mission is to bring together brilliant minds, tech enthusiasts, and creators to solve real-world challenges through hackathons. We believe in the power of collaboration and innovation, providing a platform where ideas come to life and impact industries. Whether you're a student, a seasoned developer, or an entrepreneur, our hackathons offer a unique space for participants to learn, network, and challenge themselves in a fast-paced, immersive environment.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Join us as we build a community that fosters creativity, problem-solving, and progress in the world of technology and beyond!
        </p>

        <div className="flex flex-col mt-8 justify-center items-center">
        <div className="mt-6">Want to Know more about us! </div>
          <Link to = "/contact">
            <div className="text-red-500 ml-2 underline">Contact us</div>
          </Link>
        
        </div>
      </div>
    </motion.div>
  );
};

export default About;
