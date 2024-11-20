import React, { useState } from "react";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import logo from "./1.png"

const HeroSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog box visibility

  const handleOpenDialog = () => {
    setIsDialogOpen(true); // Open the dialog when button is clicked
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div>
      <section className="relative flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white py-24 px-8 mt-2 gap-4 overflow-hidden">
        {/* Floating Background Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-400 rounded-full opacity-30 animate-pulse delay-2000"></div>

        <div>
          <img src={logo} alt="logo" />
        </div>

        <div className="relative z-10 w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold tracking-wide transition-transform transform hover:scale-105">
            HACKATHON CLUB
          </h1>
          <p className="text-xl transition-opacity duration-500 ease-in-out hover:opacity-75">
            Join us for an incredible experience where innovation meets creativity.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            {/* Only show Register button when signed out */}
            <SignedOut>
              <Link to="/sign-up">
                <button className="bg-red-500 border-2 border-red-800 rounded-lg text-black py-2 px-6 hover:bg-red-600 transition duration-300 transform hover:scale-105">
                  Register
                </button>
              </Link>
            </SignedOut>

            <button
              onClick={handleOpenDialog}
              className="bg-red-700 border-2 border-red-600 rounded-lg text-white py-2 px-6 hover:bg-red-800 transition duration-300 transform hover:scale-105"
            >
              About Us
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-2/3 mt-8 md:mt-0">
          <Carousel />
        </div>
      </section>
      <Cards />

      {/* About Us Dialog */}
      {isDialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
         
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
         
            transition={{ duration: 0.5 }}
            className="bg-stone-800 text-white p-8 rounded-lg max-w-lg w-full space-y-6"
          >
            <h2 className="text-2xl font-semibold">About Our Hackathon Club</h2>
            <p>
              Welcome to the Hackathon Club! Our mission is to bring together
              creative minds and foster innovation through hackathons, coding
              competitions, and collaboration. Whether you are an experienced
              developer or a beginner, we invite you to join us and participate
              in challenges that will push your skills to the limit.
            </p>
            <p>
              Our website serves as a platform for participants to find upcoming
              events, register for challenges, and showcase their skills. Get
              involved, meet like-minded individuals, and let’s build something
              great together!
            </p>

            <div className="flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HeroSection;
