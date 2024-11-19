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
    folder: 'user_profiles',
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

    const existingUser = await UserProfile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const imageUrl = req.file ? req.file.secure_url : '';

    const newUserProfile = new UserProfile({
      name,
      email,
      college,
      interests,
      skills: JSON.parse(skills),
      profilePhoto: imageUrl,
    });

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
    const userProfiles = await UserProfile.find();
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

// PUT: Edit user profile
router.put(`/_id`, async (req, res) => {
  try {
    const { name, email, college, interests, skills } = req.body;
    const user = await UserProfile.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user profile fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.college = college || user.college;
    user.interests = interests || user.interests;
    user.skills = skills || user.skills;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send('Internal Server Error');
  }
});



export default router;
