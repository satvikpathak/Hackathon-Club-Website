import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Hackathons from './components/Hackathons/Hackathons.jsx';
import Contact from './components/Contact/Contact.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';

// Create router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<Hero />} />
      <Route path="hackathons" element={<Hackathons />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login/>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
