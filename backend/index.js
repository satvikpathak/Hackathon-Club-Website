import express from 'express';
import connectDB from './src/config/connectDB.js';
import userRoutes from './src/routes/userRoutes.js'; // Routes for user profile
import hackathonRoutes from './src/routes/hackathonRoutes.js'; // New routes for hackathon scraping
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors({
  origin: '*', // This will allow requests from any origin
  methods: ['GET', 'POST', 'PUT'],
}));

// Connect to the MongoDB database
connectDB();

// User-related routes
app.use('/api/users', userRoutes); // API route for user profile

// Hackathon-related routes
app.use('/api/hackathons', hackathonRoutes); // API route for hackathon scraping and ChatGPT

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
