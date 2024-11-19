import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const IdProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!userData) {
    return <p className="text-center text-white mt-10">Loading...</p>;
  }

  // Handle skills if they're stored as an array of objects
  const skillsList = userData.skills && userData.skills.length > 0
    ? userData.skills.map(skill => skill.label || skill.value).join("  ") // Adjust as needed based on the skill object structure
    : "No skills available";

  return (
    <div className="min-h-screen  flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-stone-900 rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-4"> 
          {userData.name}'s Profile
        </h1>
        <div className="border-t-2 border-red-500 mb-6"></div>

        <div className="text-lg text-white space-y-3">
          <p><strong className="text-red-400">Email:</strong> {userData.email}</p>
          <p><strong className="text-red-400">College:</strong> {userData.college}</p>
          <p><strong className="text-red-400">Interests:</strong> {userData.interests}</p>
          <p><strong className="text-red-400">Skills:</strong> {skillsList}</p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate(`/edit/${id}`)} // Navigate to the edit page
            className="py-2 px-6 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold transition duration-300 ease-out transform hover:scale-105"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdProfilePage;
