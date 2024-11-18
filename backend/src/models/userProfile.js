// models/UserProfile.js
import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
  skills: [
    {
      label: String,
      value: String,
    },
  ],
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
