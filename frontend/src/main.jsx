import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Navigate } from 'react-router-dom';
import Hackathons from './Hackathons/Hackathons.jsx';
import Contact from './Contact/Contact.jsx';
import Register from './Register/Register.jsx';
// Layout component
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

// Create router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
     <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<Hero />} />
      <Route path="hackathons" element={<Hackathons/>} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="register" element={<Register />} />
     
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
