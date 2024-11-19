import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreatableSelect from "react-select/creatable";
import { useAuth } from '@clerk/clerk-react'; // Import Clerk's useAuth hook
import skillData from "./Skills.json";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const { isSignedIn } = useAuth(); // Get authentication status from Clerk
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    interests: "",
    skills: [],
  });
  const [showDialog, setShowDialog] = useState(false); // Dialog visibility state
  const [error, setError] = useState(""); // Error state
  const [showWarning, setShowWarning] = useState(false); // Show warning if not signed in
  const navigate = useNavigate();

  // Check if the profile is already submitted on page load
  useEffect(() => {
    if (localStorage.getItem("profileSubmitted")) {
      setShowDialog(true); // Show dialog if profile has been submitted before
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedOption ? selectedOption.map(option => ({ label: option.label, value: option.value })) : [],
    }));
  };

  const { getToken } = useAuth(); // Get Clerk's authentication token

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      setShowWarning(true); // Show warning if user is not signed in
      return; // Stop submission if user is not signed in
    }

    // Basic validation
    if (!formData.name || !formData.college || !formData.interests || formData.skills.length === 0) {
      setError("Please fill in all fields.");
      return; // Stop submission if validation fails
    }

    setError(""); // Clear error if validation passes
    setShowWarning(false); // Clear warning

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('college', formData.college);
      formDataToSend.append('interests', formData.interests);
      formDataToSend.append('skills', JSON.stringify(formData.skills)); // Convert skills to JSON string

      // Get Clerk token
      const token = await getToken();

      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`, // Add token for authentication
        },
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Profile created successfully');
        setShowDialog(true);
        localStorage.setItem("profileSubmitted", "true"); // Save submission status in localStorage
        localStorage.setItem("userId", result._id); // Save profile ID in localStorage
        navigate(`/profile/${result._id}`); // Redirect to the newly created profile

        // Reset form fields
        setFormData({
          name: "",
          email: "",
          college: "",
          interests: "",
          skills: [],
        });
      } else {
        console.error('Error:', result);
        toast.error('Error submitting profile');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Error submitting profile');
    }
  };

  const handleViewProfile = async () => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    if (userId) {
      try {
        // Fetch profile data from the backend
        const response = await fetch(`http://localhost:5001/api/users/${userId}`);
        if (!response.ok) {
          // Handle errors if the response is not okay (e.g., user not found)
          throw new Error("Profile not found.");
        }
        const profileData = await response.json(); // Parse the JSON response
        // Navigate to the profile view page using the userId (or profileData)
        navigate(`/profile/${userId}`, { state: { profile: profileData } });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile.");
      }
    } else {
      toast.error("Profile not found.");
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center text-white font-inter p-8"
    >
      <Toaster />
      <h2 className="text-4xl font-bold mb-6 text-center text-white">
        Create Your Profile
      </h2>
      <p className="text-stone-400 text-center mb-4">
        Fill in the details to build your technical profile.
      </p>

      {/* Display warning if user is not signed in */}
      {showWarning && (
        <div className="mb-4 text-yellow-500 text-center">
          Please sign in to submit your profile and add skills.
        </div>
      )}

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>} {/* Display error */}

      {/* Show form only when dialog is not shown and profile is not submitted */}
      {!showDialog && !localStorage.getItem("profileSubmitted") && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-stone-300 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-stone-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* College Input */}
          <div>
            <label htmlFor="college" className="block text-stone-300 font-medium mb-2">
              College
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter your college"
              className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Technical Interests */}
          <div>
            <label htmlFor="interests" className="block text-stone-300 font-medium mb-2">
              Technical Interests
            </label>
            <textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Enter your technical interests (e.g., Web Development, AI, etc.)"
              rows="3"
              className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            ></textarea>
          </div>

          {/* Skills Input */}
          <div>
            <label htmlFor="skills" className="block text-stone-300 font-medium mb-2">
              Skills
            </label>
            <CreatableSelect
              isMulti
              options={skillData}
              value={formData.skills}
              onChange={handleSkillChange}
              placeholder="Select or add your skills..."
              className="text-white"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#292524", // Match the background color
                  borderColor: "#57534e", // Match the border color
                  color: "white", // Text color
                  fontSize: "1rem",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#292524", // Menu background to match
                  color: "white", // Text color in menu
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? "#292530" : "#292524", // Focused state match
                  color: "white", // Option text color
                }),
                input: (base) => ({
                  ...base,
                  color: "white", // Text color for input
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#292524", // Match the multi-value tag background
                  color: "white", // Text color
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white", // Text color in multi-value label
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#a8a29e", // Placeholder text color
                }),
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
          >
            Submit Profile
          </button>
        </form>
      )}

      {/* Display Dialog after Profile Submission */}
      {showDialog && (
        <div className=" min-h-screen bg-opacity-50 mt-52 ">
          <div className="bg-stone-800 rounded-lg shadow-lg p-6 w-96 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Profile Submitted!
            </h3>
            <p className="text-stone-400 mb-6">
              Your profile has been submitted successfully. Click below to view it.
            </p>
            <button
              className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-bold transition ease-out duration-300"
              onClick={handleViewProfile} // Navigate to view the profile
            >
              View Profile
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserProfileForm;
