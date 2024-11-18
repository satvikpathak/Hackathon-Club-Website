import React, { useState } from "react";
import { motion } from "framer-motion";

function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const profiles = [
    {
      _id: "1",
      name: "John Doe",
      college: "XYZ University",
      interests: "Coding, AI, Machine Learning",
      skills: [
        { label: "JavaScript", value: "Advanced" },
        { label: "Python", value: "Intermediate" },
        { label: "React", value: "Advanced" },
      ],
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Jane Smith",
      college: "ABC College",
      interests: "Design, UX, Web Development",
      skills: [
        { label: "HTML", value: "Expert" },
        { label: "CSS", value: "Advanced" },
        { label: "Figma", value: "Intermediate" },
      ],
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      college: "LMN University",
      interests: "Data Science, Mathematics, Analytics",
      skills: [
        { label: "R", value: "Expert" },
        { label: "SQL", value: "Advanced" },
        { label: "Machine Learning", value: "Intermediate" },
      ],
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "4",
      name: "Bob Williams",
      college: "PQR Institute",
      interests: "Cybersecurity, Blockchain, Networking",
      skills: [
        { label: "C++", value: "Advanced" },
        { label: "Java", value: "Intermediate" },
        { label: "Network Security", value: "Expert" },
      ],
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "5",
      name: "David Lee",
      college: "DEF College",
      interests: "Game Development, AI",
      skills: [
        { label: "C#", value: "Expert" },
        { label: "Unity", value: "Intermediate" },
        { label: "AI", value: "Advanced" },
      ],
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "6",
      name: "Sophia Brown",
      college: "UVW University",
      interests: "Mobile Development, IoT",
      skills: [
        { label: "Flutter", value: "Expert" },
        { label: "Java", value: "Intermediate" },
        { label: "Kotlin", value: "Advanced" },
      ],
      image: "https://via.placeholder.com/150",
    },
  ];

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle connect button click
  const handleConnectClick = (name) => {
    console.log(`Connected with ${name}`);
  };

  // Filter profiles based on search query (by name or skill tag)
  const filteredProfiles = profiles.filter((profile) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(lowerCaseQuery) ||
      profile.skills.some((skill) =>
        skill.label.toLowerCase().includes(lowerCaseQuery)
      )
    );
  });

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-4xl mb-8 font-bold animate__animated animate__fadeIn">
        Connect with Talents
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or skill..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
        />
      </div>

      {/* Profiles List */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProfiles.map((profile, index) => (
          <motion.div
            key={index}
            className="bg-stone-950 rounded-lg p-6 shadow-lg cursor-pointer transform hover:scale-105 hover:bg-gradient-to-br from-red-700 to-red-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
                <p className="text-sm text-stone-400 mb-4">{profile.college}</p>
                <p className="text-lg mb-4">{profile.interests}</p>

                <h3 className="text-lg font-medium">Skills:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {profile.skills.map((skill, idx) => (
                    <li key={idx}>
                      <strong>{skill.label}:</strong> {skill.value}
                    </li>
                  ))}
                </ul>

                {/* Full-Width Connect Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleConnectClick(profile.name)}
                    className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-3 px-4 transition-transform transform hover:scale-105"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProfilePage;
