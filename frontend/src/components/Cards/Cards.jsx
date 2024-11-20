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
        <a
          href="https://unstop.com/competitions/1170040/register"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
            Register
          </button>
        </a>
        <a
          href="https://unstop.com/all-opportunities?oppstatus=recent&searchTerm=hackathons" // Update this to the correct link or action
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
            View Details
          </button>
        </a>
      </div>
    </div>
  );
};

const Cards = () => {
  // Shuffle the hackathon data and select the first 6 items
  const shuffledData = [...hackathonData].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* Scrolling Text Bar */}
      <div className="w-full bg-gradient-to-r from-red-600 ring-1 to-red-800 text-white py-2">
        <marquee behavior="scroll" direction="left" className="text-lg font-bold">
          🎉 Hackathon Results: Microsoft Fabric Hackathon - Winner: Jane Doe 🏆 | 
          Google Chrome AI Challenge - Winner: John Smith 🏆 | 
          She Builds AI - Winner: Emma Watson 🏆 | 
          Tech for Good - Winner: Alice Johnson 🏆 | 
          AI for Healthcare - Winner: Sarah Lee 🏆 | 
          Hack for Earth - Winner: Noah Wilson 🏆 |
          Blockchain for Change - Winner: Alex Brown 🏆
        </marquee>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Left Section - Latest Hackathons */}
        <motion.div
          className="w-full md:w-1/4 h-min text-white p-6 mt-4 rounded-lg bg-stone-950 shadow-lg flex-shrink-0"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
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
          className="w-full flex flex-wrap justify-center gap-4 mt-4 md:mt-0"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "fade", stiffness: 100 }}
        >
          {shuffledData.map((card, index) => (
            <div
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col"
              key={index}
            >
              <Card
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Cards;
