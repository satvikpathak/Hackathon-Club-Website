import React from 'react';
import Carousel from '../Carousel/Carousel'
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white py-24 px-8 mt-4 overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-400 rounded-full opacity-30 animate-pulse delay-2000"></div>

      <div className="relative z-10 w-1/2 space-y-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">HACKATHON CLUB</h1>
        <p className="text-xl">
          Join us for an incredible experience where innovation meets creativity.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
          to="/register">
          <button className="bg-red-500 border-2 border-red-800 rounded-lg text-black py-2 px-6 rounded hover:bg-red-600 transition duration-300">
            Register
          </button>
          </Link>
          <Link to="/about">
          <button className="bg-red-700 border-2 border-red-600 rounded-lg text-white py-2 px-6 rounded hover:bg-red-800 transition duration-300">
            About
          </button>
          </Link>
        </div>
      </div>
      
      <Carousel/>
    </section>
  );
};

export default HeroSection;
