import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Satvik Pathak", role: "President", image: "/team1.jpg" },
  { name: "Sanatan Sharma", role: "Vice President", image: "/team2.jpg" },
  { name: "Shivam Vats", role: "CSE Incharge", image: "/team3.jpg" },
];

const Team = () => {
  return (
    <section className="py-12 text-white overflow-hidden">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <p className="text-gray-400">The minds behind our success</p>
      </div>

      {/* Scrolling Container */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40, // Adjust speed for smooth scrolling
            repeat: Infinity,
          }}
          style={{ display: "flex", width: "max-content" }}
        >
          {/* Infinite Loop Effect */}
          {Array.from({ length: 10 }).flatMap(() =>
            teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="min-w-[200px] bg-black p-4 rounded-lg text-center mx-3 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 object-cover rounded-full mx-auto"
                />
                <h3 className="mt-3 text-lg font-semibold text-red-400">
                  {member.name}
                </h3>
                <p className="text-gray-300 text-sm">{member.role}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ title, description, imageUrl, link }) => {
  return (
    <div className="bg-black text-white rounded-lg w-full p-0 m-2 shadow-md flex flex-col h-full">
      <div className="h-32 sm:h-48">
        <img
          src={imageUrl}
          alt="Hackathon"
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="flex-grow p-3 sm:p-5 text-center">
        <h2 className="text-base sm:text-lg font-bold">{title}</h2>
        <p className="text-xs sm:text-sm text-stone-300 my-2 sm:my-3">{description}</p>
      </div>
      <div className="flex justify-center p-2 gap-2 sm:gap-4">
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block">
          <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-1 sm:py-2 px-3 sm:px-4 text-xs sm:text-base transition-transform transform hover:scale-105">
            Register
          </button>
        </a>
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block">
          <button className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full py-1 sm:py-2 px-3 sm:px-4 text-xs sm:text-base transition-transform transform hover:scale-105">
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
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    "https://images.pexels.com/photos/10142683/pexels-photo-10142683.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5494323/pexels-photo-5494323.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/6153740/pexels-photo-6153740.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181260/pexels-photo-1181260.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobileQuery = window.matchMedia("(max-width: 767px)");
      setIsMobile(mobileQuery.matches);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Update on resize

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.post(
          "https://hackathon-club-backend-production.up.railway.app/api/hackathons/fetch-hackathons"
        );
        const hackathonsWithImages = response.data.hackathons.map((hackathon) => ({
          ...hackathon,
          imageUrl: images[Math.floor(Math.random() * images.length)],
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
      <div className="min-h-screen text-white p-4 sm:p-8">
        <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-8 font-bold">
          Discover Your Next Hackathon Challenge
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-stone-950 rounded-lg p-4 sm:p-6 shadow-lg">
              <div className="breathing">
                <Skeleton height={20} width="80%" className="mb-4" />
              </div>
              <div className="breathing">
                <Skeleton height={16} width="60%" className="mb-4" />
              </div>
              <div className="breathing">
                <Skeleton height={16} width="50%" className="mb-4" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="breathing">
                    <Skeleton height={16} width={50} />
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
        <p className="text-red-500 text-lg sm:text-2xl">{error}</p>
      </div>
    );
  }

  const shuffledData = [...hackathons].sort(() => Math.random() - 0.5).slice(0, 6);

  // Conditionally use motion.div or regular div based on isMobile
  const Container = isMobile ? "div" : motion.div;

  return (
    <div className="flex flex-col w-full">
      {/* Scrolling Text Bar */}
      <div className="w-full bg-gradient-to-r from-red-600 ring-1 ring-white to-red-800 text-white py-2 overflow-hidden">
        <marquee
          behavior="scroll"
          direction="left"
          className="text-sm sm:text-lg font-bold whitespace-nowrap"
        >
          🎉 Hackathon Results: Microsoft Fabric Hackathon - Winner: Jane Doe 🏆 | 
          Google Chrome AI Challenge - Winner: John Smith 🏆 | 
          She Builds AI - Winner: Emma Watson 🏆 | 
          Tech for Good - Winner: Alice Johnson 🏆 | 
          AI for Healthcare - Winner: Sarah Lee 🏆 | 
          Hack for Earth - Winner: Noah Wilson 🏆 |
          Blockchain for Change - Winner: Alex Brown 🏆
        </marquee>
      </div>

      <Team />

      <div className="flex flex-col w-full gap-6 p-4 sm:p-6">
        {/* Left Section - Latest Hackathons */}
        <Container
          className="w-full h-min text-white rounded-lg bg-stone-950 shadow-lg"
          {...(!isMobile && {
            initial: { x: -200, opacity: 0 },
            whileInView: { x: 0, opacity: 1 },
            viewport: { once: false, amount: 0.3 },
            transition: { type: "tween", duration: 0.7, ease: "easeOut" },
            style: { willChange: "transform, opacity" },
          })}
        >
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-red-600">
              Latest Hackathons
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
              Explore the latest hackathons happening around the globe. Join now and showcase your skills! Whether you are a beginner or an experienced developer, these hackathons provide an excellent opportunity to collaborate with teams, work on exciting projects, and win amazing prizes.
            </p>
            <ul className="mt-2 sm:mt-4 text-gray-400 list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2">
              {shuffledData.slice(0, 4).map((hackathon, index) => (
                <li key={index} className=" Fenstertext-sm sm:text-lg">
                  {hackathon.title} - {hackathon.stringDate}
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Cards Section */}
        <Container
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          {...(!isMobile && {
            initial: { x: 200, opacity: 0 },
            whileInView: { x: 0, opacity: 1 },
            viewport: { once: false, amount: 0.3 },
            transition: { type: "tween", duration: 0.7, ease: "easeOut" },
            style: { willChange: "transform, opacity" },
          })}
        >
          {shuffledData.map((hackathon, index) => (
            <Card
              key={index}
              title={hackathon.title}
              description={hackathon.theme.join(", ")}
              imageUrl={hackathon.imageUrl}
              link={hackathon.link}
            />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Cards;