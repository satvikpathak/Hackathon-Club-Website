import React from "react";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const HeroSection = () => {
  return (
    <div>
      <section className="relative flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white py-24 px-8 mt-2 gap-4 overflow-hidden">
        {/* Floating Background Shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-400 rounded-full opacity-30 animate-pulse delay-2000"></div>

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
            <Link to="/skills">
              <button className="bg-red-700 border-2 border-red-600 rounded-lg text-white py-2 px-6 hover:bg-red-800 transition duration-300 transform hover:scale-105">
                Skills
              </button>
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-2/3 mt-8 md:mt-0">
          <Carousel />
        </div>
      </section>
      <Cards />
    </div>
  );
};

export default HeroSection;
