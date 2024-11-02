import express from 'express';
import connectDB from './src/config/connectDB.js';
import authRoutes from './src/routes/auth.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL if different
    methods: ['GET', 'POST'], // Add any other HTTP methods you need
  }));
  

// Connect to database
connectDB();

// Authentication routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
