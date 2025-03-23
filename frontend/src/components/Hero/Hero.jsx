import React, { useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { motion, MotionConfig } from "framer-motion";
import logo from "./1.png";

const HeroSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isDialogOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDialogOpen]);

  return (
    <MotionConfig reducedMotion="never">
      <div className="overflow-x-hidden">
        <section className="relative flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white py-12 px-4 sm:px-8 mt-2 gap-4">
          <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-red-600 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-red-400 rounded-full opacity-30 animate-pulse delay-2000"></div>

          <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-40 sm:w-48 md:w-56 h-auto" />
          </div>

          <div className="relative z-10 w-full space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide transition-transform transform hover:scale-105">
              HACKATHON CLUB
            </h1>
            <p className="text-lg sm:text-xl transition-opacity duration-500 ease-in-out hover:opacity-75">
              Join us for an incredible experience where innovation meets creativity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <SignedOut>
                <Link to="/sign-up">
                  <button className="bg-red-500 border-2 border-red-800 rounded-lg text-black py-2 px-4 sm:px-6 hover:bg-red-600 transition duration-300 transform hover:scale-105">
                    Register
                  </button>
                </Link>
              </SignedOut>
              <button
                onClick={handleOpenDialog}
                className="bg-red-700 border-2 border-red-600 rounded-lg text-white py-2 px-4 sm:px-6 hover:bg-red-800 transition duration-300 transform hover:scale-105"
              >
                About Us
              </button>
            </div>
          </div>

          <div className="relative z-10 w-full mt-8 md:mt-0">
            <Carousel />
          </div>
        </section>
        <Cards />

        {isDialogOpen && (
          <motion.div
            key="dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{ willChange: "opacity" }}
          >
            <motion.div
              key="dialog-content"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-stone-800 text-white p-4 sm:p-8 rounded-lg max-w-full sm:max-w-lg w-11/12 space-y-6"
              style={{ willChange: "transform" }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold">About Our Hackathon Club</h2>
              <p className="text-sm sm:text-base">
                Welcome to the Hackathon Club! Our mission is to bring together
                creative minds and foster innovation through hackathons, coding
                competitions, and collaboration. Whether you are an experienced
                developer or a beginner, we invite you to join us and participate
                in challenges that will push your skills to the limit.
              </p>
              <p className="text-sm sm:text-base">
                Our website serves as a platform for participants to find upcoming
                events, register for challenges, and showcase their skills. Get
                involved, meet like-minded individuals, and let’s build something
                great together!
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseDialog}
                  className="bg-red-700 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-red-800 transition duration-300"
                >
                  Close
                </button>
              </div>
              <div className="w-full bg-gradient-to-r from-red-600 ring-1 ring-white to-red-800 text-white py-2 overflow-hidden">
                
      </div>

            </motion.div>
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
};

export default HeroSection;