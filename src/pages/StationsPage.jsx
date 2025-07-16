import React from 'react';
import { Link } from 'react-router-dom';

const StationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Stations</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            This page will show all fuel stations. For now, you can:
          </p>
          <div className="space-y-2">
            <Link to="/map" className="block text-blue-600 hover:underline">
              → View stations on the interactive map
            </Link>
            <Link to="/search-and-filter-interface" className="block text-blue-600 hover:underline">
              → Use advanced search and filters
            </Link>
            <Link to="/prices" className="block text-blue-600 hover:underline">
              → View live fuel prices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationsPage;