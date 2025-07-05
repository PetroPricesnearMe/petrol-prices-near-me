import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">Petrol Prices Near Me</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Find the cheapest fuel stations in Melbourne in seconds.
        </p>
      </header>

      <Link
        to="/map-dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
      >
        View Map Now →
      </Link>

      <footer className="mt-20 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} PetrolPricesNearMe. All rights reserved.
      </footer>
    </div>
  );
}