import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Hackathons() {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [hackathons, setHackathons] = useState([]); // State to store fetched hackathons
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  // Fetch hackathons from the backend API
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.post("http://localhost:5001/api/hackathons/fetch-hackathons");
        setHackathons(response.data.hackathons); // Set fetched hackathons
        console.log(response.data.hackathons);
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setError("Failed to fetch hackathons. Please try again later.");
        setLoading(false); // Set loading to false
      }
    };

    fetchHackathons();
  }, []);

  // Check login state from localStorage when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleCardClick = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const handleCloseDetails = () => {
    setSelectedHackathon(null);
  };

  const handleLogin = () => {
    // Redirect to login page and save login state for demonstration
    navigate("/sign-in", { state: { returnTo: "/hackathons" } });
    localStorage.setItem("isLoggedIn", true); // Simulate login for demo purposes
    setIsLoggedIn(true);
  };

  // Filter hackathons based on search term
  const filteredHackathons = hackathons.filter((hackathon) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      hackathon.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      hackathon.theme.some((tag) =>
        tag.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen text-white p-8">
        <h1 className="text-4xl mb-8 font-bold">
          Discover Your Next Hackathon Challenge
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-stone-950 rounded-lg p-6 shadow-lg">
              <div className="breathing">
                <Skeleton height={30} width="80%" className="mb-4" />
              </div>
              <div className="breathing">
                <Skeleton height={20} width="60%" className="mb-4" />
              </div>
              <div className="breathing">
                <Skeleton height={20} width="50%" className="mb-4" />
              </div>
              <div className="breathing">
                <Skeleton height={20} width="40%" className="mb-4" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="breathing">
                    <Skeleton height={20} width={60} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-4xl mb-8 font-bold animate_animated animate_fadeIn">
        Discover Your Next Hackathon Challenge
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredHackathons.map((hackathon, index) => (
          <motion.div
            key={index}
            className="bg-stone-950 rounded-lg p-6 shadow-lg cursor-pointer transform hover:scale-105 hover:bg-gradient-to-br from-red-700 to-red-500"
            onClick={() => handleCardClick(hackathon)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{hackathon.title}</h2>
            <p className="text-sm text-stone-400 mb-4">
              Starts on: {hackathon.stringDate}
            </p>
            <p className="text-lg mb-2">Mode: {hackathon.mode}</p>
            <p className="text-lg font-bold mb-4">
              Organizer: {hackathon.organiser || "Not specified"}
            </p>
            <p className="text-sm text-stone-400 mb-4">
              Participants: {hackathon.participants}
            </p>
            <div className="flex flex-wrap gap-2">
              {hackathon.theme.map((tag, i) => (
                <span
                  key={i}
                  className="bg-stone-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

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
              <h2 className="text-3xl font-semibold mb-2">
                {selectedHackathon.title}
              </h2>
              <p className="text-sm text-stone-400 mb-4">
                Starts on: {selectedHackathon.stringDate}
              </p>
              <p className="text-lg mb-2">Mode: {selectedHackathon.mode}</p>
              <p className="text-lg font-bold mb-4">
                Organizer: {selectedHackathon.organiser || "Not specified"}
              </p>
              <p className="text-sm text-stone-400 mb-4">
                Participants: {selectedHackathon.participants}
              </p>
              <div className="flex justify-center">
                {isLoggedIn ? (
                  <a
                    href={selectedHackathon.link}
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
                  className="ml-4 bg-stone-700 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105"
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