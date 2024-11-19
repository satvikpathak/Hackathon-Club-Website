import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const { id } = useParams(); // Get user profile ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    interests: "",
    skills: [],
    profilePhoto: "",
  });
  const [imageFile, setImageFile] = useState(null); // To store the selected image
  const [skills, setSkills] = useState([]);
  
  useEffect(() => {
    // Fetch user profile data by ID when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/${id}`);
        const userData = response.data;
        setFormData({
          name: userData.name,
          email: userData.email,
          college: userData.college,
          interests: userData.interests,
          skills: userData.skills,
          profilePhoto: userData.profilePhoto,
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (selectedOptions) => {
    setSkills(selectedOptions.map(option => ({ label: option.label, value: option.value })));
  };

  const handleImageDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("college", formData.college);
    data.append("interests", formData.interests);
    data.append("skills", JSON.stringify(skills)); // Convert skills to JSON string
    if (imageFile) {
      data.append("image", imageFile); // Append selected image
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${id}`,
        data
      );
      toast.success("Profile updated successfully");
      navigate(`/profile/${id}`); // Redirect to the profile page after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold text-center mb-4">Edit Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded"
            required
          />
        </div>

        {/* College Input */}
        <div>
          <label className="block text-gray-700">College</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 rounded"
            required
          />
        </div>

        {/* Interests Input */}
        <div>
          <label className="block text-gray-700">Technical Interests</label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 bg-gray-100 rounded"
            required
          ></textarea>
        </div>

        {/* Skills Input */}
        <div>
          <label className="block text-gray-700">Skills</label>
          <CreatableSelect
            isMulti
            value={skills}
            onChange={handleSkillChange}
            options={[]} // Add your skills options here
            className="text-black"
            placeholder="Select or add skills"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Profile Photo</label>
          <div {...useDropzone({ onDrop: handleImageDrop })} className="border p-4 text-center">
            <p className="mb-2">Drag & Drop or click to select an image</p>
            {imageFile && <p className="text-sm">{imageFile.name}</p>}
            {formData.profilePhoto && !imageFile && (
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
