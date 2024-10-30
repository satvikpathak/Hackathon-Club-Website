import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the nested routes */}
      <Footer />
    </>
  );
}

export default App;
