import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hackathonData from "../hackathonData";

function Hackathons() {
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const handleCardClick = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const handleCloseDetails = () => {
    setSelectedHackathon(null);
  };

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-4xl mb-8 font-bold animate__animated animate__fadeIn">
        Hackathons You Can See Here
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {hackathonData.map((hackathon, index) => (
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
            <p className="text-sm text-stone-400 mb-4">{hackathon.timeLeft}</p>
            <p className="text-lg mb-2">{hackathon.location}</p>
            <p className="text-lg font-bold mb-4">{hackathon.prize}</p>
            <p className="text-sm text-stone-400 mb-4">
              {hackathon.participants}
            </p>
            <div className="flex flex-wrap gap-2">
              {hackathon.tags.map((tag, i) => (
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
                {selectedHackathon.timeLeft}
              </p>
              <p className="text-lg mb-2">{selectedHackathon.location}</p>
              <p className="text-lg font-bold mb-4">{selectedHackathon.prize}</p>
              <p className="text-sm text-stone-400 mb-4">
                {selectedHackathon.participants}
              </p>
              <p className="text-sm text-stone-300 mb-4">
                {selectedHackathon.description}
              </p>
              <div className="flex justify-center">
                <a href="https://unstop.com/competitions/1170040/register" target="_blank"><button className="bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
                  Register
                </button>
                </a>
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
