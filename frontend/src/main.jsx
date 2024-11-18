import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Hero from './components/Hero/Hero.jsx';
import Skills from './components/Skills/Skills.jsx';
import Hackathons from './components/Hackathons/Hackathons.jsx';
import Contact from './components/Contact/Contact.jsx';
import Register from './components/Register/Sign-up.jsx';
import Login from './components/Login/Sign-in.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<Hero />} />
      <Route path="hackathons" element={<Hackathons />} />
      <Route path="skills" element={<Skills />} />
      <Route path="contact" element={<Contact />} />
      <Route path="sign-up" element={<Register />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="profiles" element={<ProfilePage />} /> 
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
