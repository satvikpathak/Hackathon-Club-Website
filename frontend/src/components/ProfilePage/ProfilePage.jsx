import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ProfilePage() {
  const [profiles, setProfiles] = useState([]); // State for all user profiles
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user profiles from the backend
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users"); // Backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();
        setProfiles(data); // Set profiles state
        setLoading(false); // Turn off loading state
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false); // Turn off loading state
      }
    };

    fetchProfiles();
  }, []);

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter((profile) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(lowerCaseQuery) ||
      profile.skills.some((skill) =>
        skill.label.toLowerCase().includes(lowerCaseQuery)
      )
    );
  });

  if (loading) return <div>Loading profiles...</div>; // Show loading spinner
  if (error) return <div>Error: {error}</div>; // Show error message

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
            key={profile._id}
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
                  src={profile.profilePhoto || "https://via.placeholder.com/150"} // Use profilePhoto from API or placeholder
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
                  <a
                    href={`mailto:${profile.email || ""}`} // Ensure email is handled properly
                    className="block w-full"
                  >
                    <button
                      className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-3 px-4 transition-transform transform hover:scale-105"
                    >
                      Connect
                    </button>
                  </a>
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
