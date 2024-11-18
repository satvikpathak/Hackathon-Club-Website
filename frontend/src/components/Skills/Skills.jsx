import React, { useState } from "react";
import { motion } from "framer-motion";
import CreatableSelect from "react-select/creatable";
import skillData from "./Skills.json";

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    interests: "",
    skills: [],
  });
  
  const [error, setError] = useState(""); // New state for error message

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
      skills: selectedOption || [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.college || !formData.interests || formData.skills.length === 0) {
      setError("Please fill in all fields.");
      return; // Stop submission if validation fails
    }
    
    setError(""); // Clear error if validation passes
    
    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Profile created:', result);
        alert('Profile Submitted!');
        
        // Reset form fields
        setFormData({
          name: "",
          college: "",
          interests: "",
          skills: [],
        });
      } else {
        console.error('Error:', result);
        alert('Error submitting profile');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error submitting profile');
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
      <h2 className="text-4xl font-bold mb-6 text-center text-white">
        Create Your Profile
      </h2>
      <p className="text-stone-400 text-center mb-4">
        Fill in the details to build your technical profile.
      </p>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>} {/* Display error */}

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

        {/* College Input */}
        <div>
          <label
            htmlFor="college"
            className="block text-stone-300 font-medium mb-2"
          >
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
          <label
            htmlFor="interests"
            className="block text-stone-300 font-medium mb-2"
          >
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
          <label
            htmlFor="skills"
            className="block text-stone-300 font-medium mb-2"
          >
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

      {/* Display Selected Skills */}
      {formData.skills.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h3 className="text-lg font-semibold text-stone-300 mb-2">
            Your Selected Skills:
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill.value}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-red-800 to-red-600 text-white text-sm shadow-md"
              >
                {skill.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};


export default UserProfileForm;
