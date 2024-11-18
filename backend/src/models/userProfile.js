import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
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
