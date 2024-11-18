import express from 'express';
const router = express.Router();
import UserProfile from '../models/userProfile.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage to store images directly in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

// POST: Create new user profile with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, college, interests, skills } = req.body;

    if (!name || !email || !college || !interests || skills.length === 0) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email is already in use
    const existingUser = await UserProfile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Get image URL from Cloudinary (if an image was uploaded)
    const imageUrl = req.file ? req.file.secure_url : '';

    // Create a new user profile
    const newUserProfile = new UserProfile({
      name,
      email,
      college,
      interests,
      skills: JSON.parse(skills), // Make sure skills are passed as a JSON string
      profilePhoto: imageUrl, // Save image URL from Cloudinary
    });

    // Save the new user profile to the database
    const savedProfile = await newUserProfile.save();

    res.status(201).json(savedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating profile." });
  }
});

// GET: Fetch all user profiles
router.get('/', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find(); // Fetch all users from MongoDB
    res.status(200).json(userProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user profiles' });
  }
});

// GET: Fetch user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

export default router;
