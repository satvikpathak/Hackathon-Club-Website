import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ title, description, imageUrl, link }) => {
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
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-2 px-4 transition-transform transform hover:scale-105">
            Register
          </button>
        </a>
        <a
          href={link}
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
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the images array
  const images = [
    "https://images.pexels.com/photos/10142683/pexels-photo-10142683.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5494323/pexels-photo-5494323.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/6153740/pexels-photo-6153740.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181260/pexels-photo-1181260.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  // Fetch hackathons from the backend API
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.post("http://localhost:5001/api/hackathons/fetch-hackathons");
        
        // Map fetched hackathons to include random images from the images array
        const hackathonsWithImages = response.data.hackathons.map((hackathon) => ({
          ...hackathon,
          imageUrl: images[Math.floor(Math.random() * images.length)], // Assign a random image
        }));

        setHackathons(hackathonsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setError("Failed to fetch hackathons. Please try again later.");
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  // Shuffle the hackathon data and select the first 6 items
  const shuffledData = [...hackathons].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* Scrolling Text Bar */}
      <div className="w-full bg-gradient-to-r from-red-600 ring-1 ring-white to-red-800 text-white py-2">
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
            {shuffledData.slice(0, 4).map((hackathon, index) => (
              <li key={index} className="text-lg">
                {hackathon.title} - {hackathon.stringDate}
              </li>
            ))}
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
          {shuffledData.map((hackathon, index) => (
            <div
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col"
              key={index}
            >
              <Card
                title={hackathon.title}
                description={hackathon.theme.join(", ")}
                imageUrl={hackathon.imageUrl}
                link={hackathon.link}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Cards;