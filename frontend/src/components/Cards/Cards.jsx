import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import hackathonData from "../hackathonData.js";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-black text-white rounded-lg w-full p-0 m-2 shadow-md flex flex-col h-full">
      <div className="h-48">
        <img
          src={imageUrl}
          alt="Hackathon"
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex-grow p-5 text-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-stone-300 my-3">{description}</p>
      </div>
      <div className="flex justify-center p-2 gap-4">
        <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
          Register
        </button>
        <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );
};

const Cards = () => {
  // Shuffle the hackathon data and select the first 4 items
  const shuffledData = [...hackathonData].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
      {/* Left Section - Latest Hackathons */}
      <motion.div
        className="w-full md:w-1/4 text-white p-6 rounded-lg m-4 bg-stone-950 shadow-lg"
        initial={{ x: -200, opacity: 0 }} // Start from left and invisible
        whileInView={{ x: 0, opacity: 1 }} // Animate to visible and aligned
        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is in view
        transition={{ type: "fade", stiffness: 100 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-red-600">Latest Hackathons</h2>
        <p className="text-sm text-gray-300 mb-6">
          Explore the latest hackathons happening around the globe. Join now and showcase your skills! Whether you are a beginner or an experienced developer, these hackathons provide an excellent opportunity to collaborate with teams, work on exciting projects, and win amazing prizes.
        </p>
        <ul className="mt-4 text-gray-400 list-disc pl-6 space-y-2">
          <li className="text-lg">Hackathon 1 - December 10th, 2024</li>
          <li className="text-lg">Hackathon 2 - January 15th, 2025</li>
          <li className="text-lg">Hackathon 3 - February 20th, 2025</li>
          <li className="text-lg">Hackathon 4 - March 25th, 2025</li>
        </ul>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        className="w-full flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-4 md:h-min"
        initial={{ x: 200, opacity: 0 }} // Start from right and invisible
        whileInView={{ x: 0, opacity: 1 }} // Animate to visible and aligned
        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is in view
        transition={{ type: "fade", stiffness: 100 }}
      >
        {shuffledData.map((card, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0" key={index}>
            <Card
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          </div>
        ))}
      </motion.div>
      
    </div>
  );
};

export default Cards;
