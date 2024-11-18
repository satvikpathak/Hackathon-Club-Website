// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import UserProfile from '../models/userProfile.js';

// POST: Create new user profile
router.post('/', async (req, res) => {  // Changed to '/' instead of '/create'
  try {
    const { name, college, interests, skills } = req.body;
    const newProfile = new UserProfile({
      name,
      college,
      interests,
      skills,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving profile' });
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
