import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import hackathonData from "../hackathonData";
import { useNavigate } from "react-router-dom";

function Hackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Predefined hackathon links
  const hackathonLinks = [
    "https://example.com/hackathon1",
    "https://example.com/hackathon2",
    "https://example.com/hackathon3",
  ];

  // Fetch multiple hackathons from predefined links
  const fetchMultipleHackathons = async () => {
    try {
      const hackathonData = await Promise.all(
        hackathonLinks.map(async (url) => {
          const response = await axios.post("http://localhost:5000/fetch-hackathon", { url });
          return response.data;
        })
      );
      setHackathons(hackathonData); // Update state with all fetched hackathons
    } catch (error) {
      console.error("Error fetching multiple hackathon data:", error);
    }
  };

  // Handle card click to display hackathon details
  const handleCardClick = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  // Close the detailed modal view
  const handleCloseDetails = () => {
    setSelectedHackathon(null);
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    // Simulate login for demo purposes
    navigate("/sign-in");
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-4xl mb-8 font-bold animate__animated animate__fadeIn">
        Hackathons You Can See Here
      </h1>

      <div className="mb-4">
        {/* Button to fetch multiple hackathons */}
        <button
          onClick={fetchMultipleHackathons}
          className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-2 px-4"
        >
          Fetch All Hackathons
        </button>
      </div>

      {/* Display hackathons in a grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {(hackathons.length > 0 ? hackathons : hackathonData).map((hackathon, index) => (
          <motion.div
            key={index}
            className="bg-stone-950 rounded-lg p-6 shadow-lg cursor-pointer transform hover:scale-105 hover:bg-gradient-to-br from-red-700 to-red-500"
            onClick={() => handleCardClick(hackathon)}
          >
            <h2 className="text-2xl font-semibold mb-2">{hackathon.title}</h2>
            <p className="text-sm text-stone-400 mb-4">{hackathon.timeLeft}</p>
            <p className="text-lg mb-2">{hackathon.location}</p>
            <p className="text-lg font-bold mb-4">{hackathon.prize}</p>
            <p className="text-sm text-stone-400 mb-4">{hackathon.participants}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Display modal with hackathon details */}
      <AnimatePresence>
        {selectedHackathon && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-stone-800 rounded-lg p-6 w-11/12 md:w-1/2 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-semibold mb-2">{selectedHackathon.title}</h2>
              <p className="text-sm text-stone-400 mb-4">{selectedHackathon.timeLeft}</p>
              <p className="text-lg mb-2">{selectedHackathon.location}</p>
              <p className="text-lg font-bold mb-4">{selectedHackathon.prize}</p>
              <p className="text-sm text-stone-400 mb-4">{selectedHackathon.participants}</p>
              <div className="flex justify-center">
                {isLoggedIn ? (
                  <a
                    href="https://unstop.com/competitions/1170040/register"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
                      Register
                    </button>
                  </a>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105"
                  >
                    Login to Register
                  </button>
                )}
                <button
                  onClick={handleCloseDetails}
                  className="ml-4 bg-stone-700 text-white rounded-full py-2 px-4"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Hackathons;
