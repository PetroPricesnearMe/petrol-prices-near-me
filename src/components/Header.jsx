// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="text-primary w-6 h-6" />
          <span className="font-bold text-xl text-gray-800 tracking-tight">PetrolPricesNearMe</span>
        </Link>

        <nav className="space-x-6 hidden md:flex">
          <Link to="/" className="text-gray-600 hover:text-primary transition font-medium">Home</Link>
          <Link to="/map" className="text-gray-600 hover:text-primary transition font-medium">Map</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition font-medium">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
