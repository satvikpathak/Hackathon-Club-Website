import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";  // Import Clerk's useUser hook
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

function ProfilePage() {
  const { isSignedIn, user } = useUser();  // Check if the user is signed in
  const [profiles, setProfiles] = useState([]); // State for all user profiles
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedProfile, setSelectedProfile] = useState(null); // State for the selected profile (for the modal)

  // Images Array
  const images = [img1, img2, img3, img4, img5, img6];

  // Fetch user profiles from the backend
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users"); // Backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();

        // Add random images to each profile
        const profilesWithImages = data.map((profile) => ({
          ...profile,
          profilePhoto: images[Math.floor(Math.random() * images.length)],
        }));

        setProfiles(profilesWithImages); // Set profiles state
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

  // Handle "Connect" button click
  const handleConnect = (email) => {
    const subject = "Let's Connect!";
    const body = "Hi, I came across your profile and would like to connect with you.";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the email client in a new tab
    window.open(mailtoUrl, "_blank");
  };

  // Handle "Read More" click - show modal with full profile
  const handleReadMore = (profile) => {
    setSelectedProfile(profile);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProfile(null);
  };

  if (loading) return <div>Loading profiles...</div>; // Show loading spinner
  if (error) return <div>Error: {error}</div>; // Show error message

  // If the user is not logged in, show a login prompt
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white font-inter p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Please Log In First</h2>
        <p className="text-stone-400 text-center mb-4">You need to be signed in to view profiles.</p>
        <button
          onClick={() => navigate("/sign-in")} // Navigate to the sign-in page
          className="bg-gradient-to-r from-red-700 to-red-500 py-2 px-4 rounded-lg text-white font-semibold"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

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
            className="bg-stone-950 rounded-lg p-6 shadow-lg cursor-pointer transform hover:scale-105 hover:bg-gradient-to-br from-red-700 to-red-500 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex gap-6 mb-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={profile.profilePhoto || "fallback-image.jpg"} 
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
                  {/* Limit the number of displayed skills */}
                  {profile.skills.slice(0, 3).map((skill, idx) => (
                    <li key={idx}>
                      <strong>{skill.label}:</strong> {skill.value}
                    </li>
                  ))}
                </ul>

                {/* "Read More" Button */}
                {profile.skills.length > 3 && (
                  <button
                    onClick={() => handleReadMore(profile)}
                    className="text-red-500 mt-2 block"
                  >
                    Read More...
                  </button>
                )}
              </div>
            </div>

            {/* Full-Width Connect Button at Bottom */}
            <div className="mt-auto">
              <button
                onClick={() => handleConnect(profile.email)}
                className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-3 px-4 transition-transform transform hover:scale-105"
              >
                Connect
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for Full Profile */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-stone-900 p-6 rounded-lg w-80 md:w-96">
            <h2 className="text-2xl font-semibold mb-4">{selectedProfile.name}</h2>
            <h3 className="text-lg font-medium">Skills:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {selectedProfile.skills.map((skill, idx) => (
                <li key={idx}>
                  <strong>{skill.label}:</strong> {skill.value}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full py-3 px-4 transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;