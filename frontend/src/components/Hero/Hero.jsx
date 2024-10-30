import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center bg-gradient-to-r from-green-900 via-green-700 to-green-900 text-white py-24 px-8 mt-16 overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-600 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-400 rounded-full opacity-30 animate-pulse delay-2000"></div>

      <div className="relative z-10 w-1/2 space-y-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">HACKATHON CLUB</h1>
        <p className="text-xl">
          Join us for an incredible experience where innovation meets creativity.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-black py-2 px-6 rounded hover:bg-green-600 transition duration-300">
            Register
          </button>
          <button className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800 transition duration-300">
            About
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
