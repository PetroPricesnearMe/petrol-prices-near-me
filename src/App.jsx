import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Map from './pages/Map';
import Header from './components/Header';
import Prices from './pages/Prices';

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
      
      <Analytics />
    </div>
  );
}