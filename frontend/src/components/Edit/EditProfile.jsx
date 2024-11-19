import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import CreatableSelect from 'react-select/creatable';
import toast from 'react-hot-toast';
import skillData from "./Skills.json";

const EditProfile = () => {
  const { state } = useLocation(); // Retrieve the passed state (userProfile)
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    interests: "",
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  
  // Fetch user profile data from the backend if state is not passed
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`http://localhost:5001/api/users/${state?.userProfile?.id || 'default_user_id'}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setFormData({
            name: result.name,
            email: result.email,
            college: result.college,
            interests: result.interests,
            skills: result.skills,
          });
        } else {
          toast.error('Error fetching profile data');
        }
      } catch (error) {
        toast.error('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if no state is passed, or data is not available
    if (!state?.userProfile) {
      fetchProfileData();
    } else {
      setFormData(state.userProfile); // Prefill from state if available
      setLoading(false);
    }
  }, [state, getToken]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedData = {
      name: formData.name,
      email: formData.email,
      college: formData.college,
      interests: formData.interests,
      skills: formData.skills.map(skill => skill.value),  // Ensure skills are in the correct format
    };
  
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:5001/api/users/_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',  // Set correct content type
        },
        body: JSON.stringify(updatedData),  // Send JSON data
      });
  
      if (response.ok) {
        toast.success('Profile updated successfully');
        navigate(`/profile/${state?.userProfile?.id || 'default_user_id'}`);
      } else {
        toast.error('Error updating profile');
      }
    } catch (err) {
      toast.error('Error updating profile');
    }
  };
  

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading indicator while fetching data
  }

  return (
    <div className="min-h-screen flex flex-col items-center text-white font-inter p-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">Edit Your Profile</h2>
      <p className="text-stone-400 text-center mb-4">Make changes to your profile details.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-stone-300 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-stone-300 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* College Input */}
        <div>
          <label htmlFor="college" className="block text-stone-300 font-medium mb-2">College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter your college"
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Technical Interests */}
        <div>
          <label htmlFor="interests" className="block text-stone-300 font-medium mb-2">Technical Interests</label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Enter your technical interests"
            rows="3"
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Skills Input */}
        <div>
          <label htmlFor="skills" className="block text-stone-300 font-medium mb-2">Skills</label>
          <CreatableSelect
            isMulti
            options={skillData} // Add your skill options here
            value={formData.skills}
            onChange={handleSkillChange}
            placeholder="Select or add your skills..."
            className="text-white"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#292524",
                borderColor: "#57534e",
                color: "white",
                fontSize: "1rem",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#292524",
                color: "white",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? "#292530" : "#292524",
                color: "white",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#292524",
                color: "white",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "white",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#a8a29e",
              }),
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold text-lg transition ease-out duration-300 shadow-lg shadow-red-500/50"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
